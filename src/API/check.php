<?php
require 'vendor/autoload.php';
require_once 'src/DB.php';
ini_set('max_execution_time', 900);


/**
* 
*/


class Check
{
	public function checke()
	{
		$pdo = connectDB();
		$words = $pdo->query('SELECT word FROM res');                                                                  
		$words = $words->fetchAll();                                                                                       
		//print_r($words);             
		$client = new \GuzzleHttp\Client();        

		$searchField = $_GET['searchText'];   
		$regionId = $_GET['region'];
		//$regionId  = 113;
		$res = $client->request('GET','https://api.hh.ru/vacancies?area='.$regionId.'&text="'.$searchField.'"&per_page=500&page=0');  
		$result =  $res->getBody();                                                                                        
		$result = json_decode($result,true);                      
		$masArray = [];     
		//print_r($result);   
		$numbersOfItems = count($result['items']);
		$onePercentProgress = 100/$numbersOfItems;
		session_start();
		$_SESSION['count'] = 0;
		session_write_close();   
		foreach ($result['items'] as $key => $res) {
			session_start();
		    $vacancie = $client->request('GET', $res['url']);                                                              
		    $vacancie = $vacancie->getBody();                                                                              
		    $vacancie = json_decode($vacancie,true);                                                                       
		    $arr = preg_split("[\s+]", $vacancie['description']);                                                          
		    $arr = $this->treatmentArray($arr);
		    array_push($masArray,$arr);      
		    $_SESSION['count'] +=$onePercentProgress;
		    session_write_close();                                                                     
		}
		$arr = $this->countWordsInDescription($masArray,$words);
		arsort($arr);
		$jsonResponse  = json_encode($arr);
		return $jsonResponse;
	}
	private function treatmentArray($arr)
	{ 
	    $resArray = [];                                                                                                
	    $word = '';                                                                                                    
	    foreach ($arr as $key => $value) {                                                                             
	                                                                                                                   
	        $word  = trim($value);                                                                                     
	        $word = strip_tags($word);                                                                                 
	        $word = strtolower($word);                                                                                 
	        preg_match('/([A-z]|[0-9])*/',$word,$matches);                                                             
	        if($matches[0]!=='') {                                                                                     
	            $word = preg_replace("/(,|\))/", "", $word);                                                           
	            array_push($resArray, $word);                                                                          
	        }                                                                                                          
	    }                                                                                                              
	    return $resArray;                                                                                              
	}                                                                                                                  
	private function countWordsInDescription($masArray,$words)                                                                 
	{
	    $arr = [];                                                                                                     
	    foreach ($masArray as $value)                                                                                  
	    {                                                                                 
	        foreach ($value as $wordVacancie)                                                                          
	        {                                                                                                          
	            foreach ($words as $word){
	                if($wordVacancie===$word['word']){
	                    $check = $this->checkArray($arr,$word['word']);                                                       
	                    if(!$check){                                                                                   
	                       	$arr[$word['word']] = 1;                                                              
	                    }else{                                                                                         
	                        $arr[$word['word']] += 1;                                                                
	                    }                                                                                              
	                }                                                                                                  
	            }                                                                                                      
	        }                                                                                                          
	    }                                                                                                              
	    //print_r($arr);    
	    return $arr;                                                                                             
	}                                                                                                                  
	private function checkArray($arr,$word)                                                                                    
	{
	    foreach ($arr as $key=>$value) {                                                                                     
	        if($key==$word){                                                                                 
	            return true;                                                                                           
	        }                                                                                                          
	    }                                                                                                              
	    return 0;                                                                                                      
	}                                                                                                                  
	   
}
                                                                                              
                                                                      
                                                                                                                   
                                                                                                    