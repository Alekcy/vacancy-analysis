<?php
require 'vendor/autoload.php';
require_once 'src/DB.php';
/**
* 
*/
class Check
{
	public function check()
	{
		$pdo = connectDB();
		$words = $pdo->query('SELECT word FROM results');                                                                  
		$words = $words->fetchAll();                                                                                       
		//print_r($words);             
		$client = new \GuzzleHttp\Client();        

		$searchField = 'python';   
		$res = $client->request('GET','https://api.hh.ru/vacancies?area=113&text="'.$searchField.'"&per_page=50&page=0');  
		$result =  $res->getBody();                                                                                        
		$result = json_decode($result,true);                      
		$masArray = [];                                                                                                    
		foreach ($result['items'] as $key => $res) {
		    $vacancie = $client->request('GET', $res['url']);                                                              
		    $vacancie = $vacancie->getBody();                                                                              
		    $vacancie = json_decode($vacancie,true);                                                                       
		    $arr = preg_split("[\s+]", $vacancie['description']);                                                          
		    $arr = treatmentArray($arr);
		    array_push($masArray,$arr);                                                                                    
		}                                                                                                                  
		//print_r($masArray);                                                                                              
		countWordsInDescription($masArray,$words);  */ 
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
	    {   //print_r($value);                                                                                         
	        foreach ($value as $wordVacancie)                                                                          
	        {                                                                                                          
	            //print_r($wordVacancie);                                                                              
	            foreach ($words as $word){                                                                             
	                //print_r($word['word']);                                                                          
	                if($wordVacancie===$word['word']){                                                                 
	                    echo $wordVacancie.' : '.$word['word'].PHP_EOL;                                                
	                    $check = checkArray($arr,$word['word']);                                                       
	                    if(!$check){                                                                                   
	                        $tempArr = ['word'=>$word['word'],'count'=>0];                                             
	                       array_push($arr,$tempArr);                                                                  
	                    }else{                                                                                         
	                        $index = indexOf($arr,$word['word']);                                                      
	                        $arr[$index]['count'] += 1;                                                                
	                    }                                                                                              
	                }                                                                                                  
	            }                                                                                                      
	        }                                                                                                          
	    }                                                                                                              
	    print_r($arr);                                                                                                 
	}                                                                                                                  
	private function checkArray($arr,$word)                                                                                    
	{
	    foreach ($arr as $value) {                                                                                     
	        if($value['word']==$word){                                                                                 
	            return true;                                                                                           
	        }                                                                                                          
	    }                                                                                                              
	    return 0;                                                                                                      
	}                                                                                                                  
	private function indexOf($arr,$word)                                                                                       
	{ 
	     foreach ($arr as $key=>$value) {                                                                              
	         if($value['word']==$word){                                                                                
	             return $key;                                                                                          
	         }                                                                                                         
	     }                                                                                                             
	}              
}
                                                                                              
                                                                      
                                                                                                                   
                                                                                                    