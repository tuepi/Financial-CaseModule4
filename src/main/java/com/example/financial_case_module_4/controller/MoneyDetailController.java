package com.example.financial_case_module_4.controller;

import com.example.financial_case_module_4.model.MoneyDetail;
import com.example.financial_case_module_4.service.moneyDetail.IMoneyDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/users/money_details")
public class MoneyDetailController {
    @Autowired
    IMoneyDetailService moneyDetailService;
    @GetMapping()
    public ResponseEntity<Iterable<MoneyDetail>> findAllMoneyDetail(){
        return new ResponseEntity<>(moneyDetailService.findAll(), HttpStatus.OK);
    }
}
