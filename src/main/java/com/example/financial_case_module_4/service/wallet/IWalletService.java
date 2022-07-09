package com.example.financial_case_module_4.service.wallet;

import com.example.financial_case_module_4.model.User;
import com.example.financial_case_module_4.model.Wallet;
import com.example.financial_case_module_4.service.IGeneralService;

import java.util.List;

public interface IWalletService extends IGeneralService<Wallet> {
    Iterable<Wallet>findAllByNameContaining(String name);

    Iterable<Wallet>findAllByUserId(Long id);
}
