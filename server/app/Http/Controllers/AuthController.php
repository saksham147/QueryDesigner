<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

use Validator;
use DB;

class AuthController extends Controller
{
    public function __construct(){
        $this->middleware('auth:api', ['except' => ['login','register','user_detail','loginAs']]);
    }

    public function login(Request $req){
        $validate = Validator::make($req->all(), [
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if (!$validate->fails()) {
            if (! $token = auth()->attempt($req->only('username', 'password'))) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthorized',
                ], 401);
            }
           
            $user = $this->generateToken($token);
            return response()->json([
                'status' => 200,
                'message' => 'Logged In Successfully',
                'token' => $user,       
            ],200);
        }else{
             return response()->json([
                'message' => $validate->errors(),
                'status' => 403,
            ], 403); 
        }
    }


   
    protected function generateToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()->username
        ]);
    }

    public function register(Request $req){
        $validate = Validator::make($req->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|email|string|max:100|regex:/(.+)@(.+)\.(.+)/i',
            'contact_number' => 'required|numeric|min:10',//unique:users|
            'username' => 'required|between:5,15|string|unique:users|regex:/^[A-Za-z0-9]{5,15}$/',
            'password' => 'required|string|min:6',
        ]);

        if (!$validate->fails()) {
            $user = User::create([
                'name' => $req->name,
                'email' => $req->email,
                'contact_number' => $req->contact_number,
                'username' => $req->username,
                'password' => Hash::make($req->password),
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'User created successfully',
            ]);
        }else{
             return response()->json([
                'message' => $validate->errors(),
                'status' => 403,
            ], 403); 
        }
    }

    

    public function verifyReciver($type, $number){
        if($type == "number"){
            if(strlen($number) == 10 ) {
                $phoneNumber = $number;
            } elseif (strlen($number) == 12) {
                $number = substr($number, -10);
            }elseif(strlen($number) == 13){
                $number = substr($number, -10);
            }else{
                $number = substr($number, -10);
            }
            if(strlen($number) == 10  && ctype_digit($number)){
                $new_reciver = '91'.$number;
            }
        }elseif($type == "email"){
            $regex = '/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/'; 
            if(filter_var($number, FILTER_VALIDATE_EMAIL)) {
                if (preg_match($regex, $number)) {
                    $new_reciver = $number;
                }  
            }
        }
        return $new_reciver;
    }
}