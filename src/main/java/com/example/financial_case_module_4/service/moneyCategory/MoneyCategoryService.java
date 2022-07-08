package com.example.financial_case_module_4.service.moneyCategory;

import com.example.financial_case_module_4.model.MoneyCategory;
import com.example.financial_case_module_4.repository.IMoneyCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class MoneyCategoryService implements IMoneyCategoryService{
@Autowired
    private IMoneyCategoryRepository moneyCategoryRepository;
    public Iterable<MoneyCategory> findAll() {
        return moneyCategoryRepository.findAll();
    }

    public Optional<MoneyCategory> findById(Long id) {
        return moneyCategoryRepository.findById(id);
    }

    public MoneyCategory save(MoneyCategory moneyCategory) {
        return moneyCategoryRepository.save(moneyCategory);
    }

    public void remove(Long id) {
        moneyCategoryRepository.deleteById(id);
    }
}
