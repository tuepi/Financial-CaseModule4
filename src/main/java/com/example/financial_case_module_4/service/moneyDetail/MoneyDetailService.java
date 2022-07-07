package com.example.financial_case_module_4.service.moneyDetail;

import com.example.financial_case_module_4.model.MoneyDetail;
import com.example.financial_case_module_4.repository.IMoneyDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class MoneyDetailService implements IMoneyDetailService{
    @Autowired
    private IMoneyDetailRepository moneyDetailRepository;
    public Iterable<MoneyDetail> findAll() {
        return moneyDetailRepository.findAll();
    }

    public Optional<MoneyDetail> findById(Long id) {
        return moneyDetailRepository.findById(id);
    }

    public MoneyDetail save(MoneyDetail moneyDetail) {
        return moneyDetailRepository.save(moneyDetail);
    }

    public void remove(Long id) {
        moneyDetailRepository.deleteById(id);
    }
}
