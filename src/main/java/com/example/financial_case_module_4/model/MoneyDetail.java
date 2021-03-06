package com.example.financial_case_module_4.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
public class MoneyDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "ko đe trong dmm!!")
    private String name;


    public MoneyDetail() {
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

}
