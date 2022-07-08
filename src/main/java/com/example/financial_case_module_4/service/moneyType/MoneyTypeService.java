package com.example.financial_case_module_4.service.moneyType;

import com.example.financial_case_module_4.model.MoneyType;
import com.example.financial_case_module_4.repository.IMoneyTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class MoneyTypeService implements IMoneyTypeService{
    @Autowired
    private IMoneyTypeRepository moneyTypeRepository;
    public Iterable<MoneyType> findAll() {
        return moneyTypeRepository.findAll();
    }

    public Optional<MoneyType> findById(Long id) {
        return moneyTypeRepository.findById(id);
    }

    public MoneyType save(MoneyType moneyType) {
        return moneyTypeRepository.save(moneyType);
    }

    public void remove(Long id) {
            moneyTypeRepository.deleteById(id);
    }
}
