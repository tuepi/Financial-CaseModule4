package com.example.financial_case_module_4.service.transaction;

import com.example.financial_case_module_4.model.Transaction;
import com.example.financial_case_module_4.model.Wallet;
import com.example.financial_case_module_4.repository.ITransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
@Service
public class TransactionService implements ITransactionService{
    @Autowired
    private ITransactionRepository transactionRepository;
    public Iterable<Transaction> findAll() {
        return transactionRepository.findAll();
    }

    public Optional<Transaction> findById(Long id) {
        return transactionRepository.findById(id);
    }

    public Transaction save(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public void remove(Long id) {
        transactionRepository.deleteById(id);
    }

    public Iterable<Transaction> findAllByCreatedDateBetween(LocalDateTime fromTime, LocalDateTime toTime) {
        return transactionRepository.findAllByCreatedDateBetween(fromTime,toTime);
    }

    public Iterable<Transaction> findAllByWallet(Wallet wallet) {
        return transactionRepository.findAllByWallet(wallet);
    }

    public Iterable<Transaction> findAllByWalletAndCreatedDateBetween(Long wallet_id, LocalDateTime fromTime, LocalDateTime toTime) {
        return transactionRepository.findAllByWalletAndCreatedDateBetween(wallet_id,fromTime,toTime);
    }

    public int getMoneyCategoryByTransactionId(Long transaction_id) {
        return transactionRepository.getMoneyCategoryByTransactionId(transaction_id);
    }

    @Override
    public Iterable<Transaction> findAllByMoneyCategory_Id(Long id) {
        return transactionRepository.findAllByMoneyCategory_Id(id);
    }

    @Override
    public Double getAllByMoneyAmount(Long money_detail_id) {
        return transactionRepository.getAllByMoneyAmount(money_detail_id);
    }

    @Override
    public Double getAllByMoneyAmount() {
        return transactionRepository.getAllByMoneyAmount();
    }

}
