package com.example.financial_case_module_4.repository;

import com.example.financial_case_module_4.model.Transaction;
import com.example.financial_case_module_4.model.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
@Repository

public interface ITransactionRepository extends JpaRepository<Transaction, Long> {
    Iterable<Transaction> findAllByCreatedDateBetween(LocalDateTime fromTime, LocalDateTime twoTime);
    Iterable<Transaction> findAllByWallet(Wallet wallet);
    Iterable<Transaction> findAllByWalletAndCreatedDateBetween(Long wallet_id,LocalDateTime fromTime,LocalDateTime twoTime);
}
