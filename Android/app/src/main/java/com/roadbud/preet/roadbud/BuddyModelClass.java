package com.roadbud.preet.roadbud;

public class BuddyModelClass {
    private String id, name,phone, address, postal_code,service_type;

    public BuddyModelClass() {
    }

    public BuddyModelClass(String id, String name, String phone, String address, String postal_code
            , String service_type) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.postal_code = postal_code;
        this.service_type = service_type;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPostal_code() {
        return postal_code;
    }

    public void setPostal_code(String postal_code) {
        this.postal_code = postal_code;
    }

    public String getService_type() {
        return service_type;
    }

    public void setService_type(String service_type) {
        this.service_type = service_type;
    }
}
