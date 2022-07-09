package com.example.financial_case_module_4.service.login;


import com.example.financial_case_module_4.model.Role;

public interface RoleService {
    Iterable<Role> findAll();


    void save(Role role);

    Role findByName(String name);
}
