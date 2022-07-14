package com.example.financial_case_module_4.repository;

import com.example.financial_case_module_4.model.Transaction;
import com.example.financial_case_module_4.model.Wallet;
import org.springframework.cglib.proxy.LazyLoader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository

public interface ITransactionRepository extends JpaRepository<Transaction, Long> {
    Iterable<Transaction> findAllByCreatedDateBetween(LocalDateTime fromTime, LocalDateTime toTime);
    Iterable<Transaction> findAllByWallet(Wallet wallet);
    Iterable<Transaction> findAllByWalletAndCreatedDateBetween(Long wallet_id,LocalDateTime fromTime,LocalDateTime toTime);
    Iterable<Transaction> findAllByMoneyCategory_Id(Long id);

    @Query(value = "select sum(money_amount) as 'total' from transaction where money_detail_id =:id",nativeQuery = true)
    Double getAllByMoneyAmount(@Param("id") Long money_detail_id);

    @Query(value = "select sum(money_amount) as 'total' from transaction ",nativeQuery = true)
    Double getAllByMoneyAmount();

    @Query (value = "select money_category.id from" +
            " money_category join money_detail md on" +
            " money_category.id = md.money_category_id " +
            "join transaction t on md.id = t.money_detail_id" +
            " join wallet w on w.id = t.wallet_id where t.id =: id" , nativeQuery = true)
    Integer getMoneyCategoryByTransactionId(@Param("id")Long money_category_id);

    @Query(value = "select transaction.id, transaction.created_date,transaction.money_category_id,transaction.money_detail_id,transaction.wallet_id,transaction.money_amount, transaction.note, wallet.name ,user_table.username from transaction\n" +
            "    join wallet on transaction.wallet_id = wallet.id\n" +
            "    join user_table on  user_table.id = wallet.user_id\n" +
            "where user_table.id = :user_id",nativeQuery = true)
    Iterable<Transaction> findAllByUserId(@Param("user_id") Long user_id);
}
