package com.example.financial_case_module_4.repository;

import com.example.financial_case_module_4.model.MoneyType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IMoneyTypeRepository extends JpaRepository<MoneyType, Long> {
}
