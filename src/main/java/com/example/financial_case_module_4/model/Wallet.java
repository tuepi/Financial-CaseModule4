package com.example.financial_case_module_4.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
public class Wallet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "ko de trong dm!!")
    private String name;
    private double moneyAmount;
    @ManyToOne
    private MoneyType moneyType;
    @ManyToOne
    private User user;

    public Wallet() {
    }

    public Wallet( String name, double moneyAmount, String icon, MoneyType moneyType, User user) {
        this.name = name;
        this.moneyAmount = moneyAmount;
        this.moneyType = moneyType;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getMoneyAmount() {
        return moneyAmount;
    }

    public void setMoneyAmount(double moneyAmount) {
        this.moneyAmount = moneyAmount;
    }


    public MoneyType getMoneyType() {
        return moneyType;
    }

    public void setMoneyType(MoneyType moneyType) {
        this.moneyType = moneyType;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
