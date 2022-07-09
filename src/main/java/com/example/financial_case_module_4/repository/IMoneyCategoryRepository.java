package com.example.financial_case_module_4.repository;

import com.example.financial_case_module_4.model.MoneyCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface IMoneyCategoryRepository extends JpaRepository<MoneyCategory,Long> {

}
