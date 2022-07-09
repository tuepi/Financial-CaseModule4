package com.example.financial_case_module_4.service.transaction;

import com.example.financial_case_module_4.model.Transaction;
import com.example.financial_case_module_4.model.Wallet;
import com.example.financial_case_module_4.service.IGeneralService;

import java.time.LocalDateTime;

public interface ITransactionService extends IGeneralService<Transaction> {
    Iterable<Transaction>findAllByCreatedDateBetween(LocalDateTime fromTime,LocalDateTime toTime);
    Iterable<Transaction>findAllByWallet(Wallet wallet);
    Iterable<Transaction>findAllByWalletAndCreatedDateBetween(Long wallet_id,LocalDateTime fromTime,LocalDateTime toTime);
    int getMoneyCategoryByTransactionId(Long transaction_id);
}
