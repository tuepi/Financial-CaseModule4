package com.example.financial_case_module_4.service.moneyDetail;

import com.example.financial_case_module_4.model.MoneyCategory;
import com.example.financial_case_module_4.model.MoneyDetail;
import com.example.financial_case_module_4.service.IGeneralService;

public interface IMoneyDetailService extends IGeneralService<MoneyDetail> {
    Iterable<MoneyCategory>showMoneyCategory();
}
