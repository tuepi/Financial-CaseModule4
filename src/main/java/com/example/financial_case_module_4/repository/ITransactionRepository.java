package com.example.financial_case_module_4.repository;

import com.example.financial_case_module_4.model.Transaction;
import com.example.financial_case_module_4.model.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
@Repository

public interface ITransactionRepository extends JpaRepository<Transaction, Long> {
    Iterable<Transaction> findAllByCreatedDateBetween(LocalDateTime fromTime, LocalDateTime twoTime);
    Iterable<Transaction> findAllByWallet(Wallet wallet);
    Iterable<Transaction> findAllByWalletAndCreatedDateBetween(Long wallet_id,LocalDateTime fromTime,LocalDateTime twoTime);



        @Query (value = "select money_category.id from money_category join money_detail md on money_category.id = md.money_category_id join transaction t on md.id = t.money_detail_id join wallet w on w.id = t.wallet_id where t.id = ?" , nativeQuery = true)
        int getMoneyCategoryByTransactionId(Long transaction_id);

}
