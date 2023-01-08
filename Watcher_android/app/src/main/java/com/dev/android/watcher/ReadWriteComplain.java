package com.dev.android.watcher;

import android.app.DatePickerDialog;

public class ReadWriteComplain {

    public String name,place, license_number,wheel,crime_date,register_date;
//    DatePickerDialog crime_date_picker, fir_date_picker;

    public ReadWriteComplain(){};


    public  ReadWriteComplain(String name, String place, String license_number, String wheel,String register_date,String crime_date){
        this.name=name;
        this.place=place;
        this.license_number=license_number;
        this.wheel=wheel;
        this.crime_date=crime_date;
        this.register_date=register_date;


    }
}
