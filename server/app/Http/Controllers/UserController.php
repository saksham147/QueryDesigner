<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Helpers\DatabaseConnection;

use Validator;
use DB;

class UserController extends Controller{
    // public function register(Request $req){
    //     $validate = Validator::make($req->all(), [
    //         'name' => 'required|string|between:2,100',
    //         'email' => 'required|email|string|max:100|regex:/(.+)@(.+)\.(.+)/i',
    //         'contact_number' => 'required|numeric|min:10',//unique:users|
    //         'username' => 'required|between:5,15|string|unique:users|regex:/^[A-Za-z0-9]{5,15}$/',
    //         'password' => 'required|string|min:6',
    //     ]);

    //     if (!$validate->fails()) {
    //         $user = User::create([
    //             'name' => $req->name,
    //             'email' => $req->email,
    //             'contact_number' => $req->contact_number,
    //             'username' => $req->username,
    //             'password' => Hash::make($req->password),
    //         ]);

    //         return response()->json([
    //             'status' => 'success',
    //             'message' => 'User created successfully',
    //         ]);
    //     }else{
    //          return response()->json([
    //             'message' => $validate->errors(),
    //             'status' => 403,
    //         ], 403); 
    //     }
    // }

    public function test(){
        $params->driver = "mysql";
        $params->host = "127.0.0.1";
        $params->username = "root";
        $params->password = "";
        // $params = ['driver' => 'mysql', 'host' => '127.0.0.1', 'username' => 'root', 'password' => ''];
        
        $connection = DatabaseConnection::setConnection($params);
        return $connection;
        $users = $connection->select(...);
    }

    

   
}