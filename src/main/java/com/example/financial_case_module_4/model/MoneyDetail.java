package com.example.financial_case_module_4.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
public class MoneyDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotBlank(message = "ko đe trong dmm!!")
    private String name;
    @ManyToOne
    private MoneyCategory moneyCategory;

    public MoneyDetail() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public MoneyCategory getMoneyCategory() {
        return moneyCategory;
    }

    public void setMoneyCategory(MoneyCategory moneyCategory) {
        this.moneyCategory = moneyCategory;
    }
}
