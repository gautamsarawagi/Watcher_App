package com.dev.android.watcher;

public class ReadWriteUserDetails {

    public String name,email,password,value;

    public ReadWriteUserDetails(){};

    //Constructor
    public  ReadWriteUserDetails(String name,String email,String password,String value){
        this.name=name;
        this.email=email;
        this.password=password;
        this.value=value;
    }

}
