<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;  # <= 追記


class PageController extends Controller
{
    //
    public function index(){

        // BladeファイルをHTMLとしてレンダリング
        $html = view('test')->render();

        // HTMLを保存する（オフラインで利用するためにpublicフォルダに保存）
        file_put_contents(storage_path("app/public/index.html"), $html);

        // オンラインの画面でもテスト表示
        return view('test');
    }
}
