<?php

$language_code = array(
  "chinese" => "zh-CN"
);

function shuffle_assoc(&$array) {
    $keys = array_keys($array);

    shuffle($keys);

    foreach($keys as $key) {
        $new[$key] = $array[$key];
    }

    $array = $new;

    return true;
}

function text_to_speech($text, $lang)
{
  header("Content-Type: audio/mpeg");

  $ch = curl_init();
  $url = "https://translate.google.com/translate_tts?ie=UTF-8&q=".$text."&tl=".$lang."&client=tw-ob";
  curl_setopt($ch, CURLOPT_URL, $url);
  echo $url;
  curl_setopt($ch, CURLINFO_HEADER_OUT, true);
  //curl 'https://translate.google.com/translate_tts?ie=UTF-8&q=Hello%20Everyone&tl=en&client=tw-ob' -H 'Referer: http://translate.google.com/' -H 'User-Agent: stagefright/1.2 (Linux;Android 5.0)' > google_tts.mp3
  curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Referer: http://translate.google.com/',
    'User-Agent: stagefright/1.2 (Linux;Android 5.0)'
  ));
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

  $response = curl_exec($ch);

  return $response;
}



?>
