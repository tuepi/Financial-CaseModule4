package com.example.financial_case_module_4.repository;

import com.example.financial_case_module_4.model.MoneyCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface IMoneyCategoryRepository extends JpaRepository<MoneyCategory,Long> {
    @Query(value = "select c.name, sum(t.money_amount) as 'total' from money_detail de join transaction t on de.id = t.money_detail_id and de.money_category_id= 1 group by  c.id",nativeQuery = true)
    Iterable<MoneyCategory>showMoneyCategory();
}
