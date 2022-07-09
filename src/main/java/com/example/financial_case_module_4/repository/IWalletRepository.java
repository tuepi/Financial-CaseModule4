package com.example.financial_case_module_4.repository;

import com.example.financial_case_module_4.model.User;
import com.example.financial_case_module_4.model.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IWalletRepository extends JpaRepository<Wallet, Long> {
    Iterable<Wallet>findAllByNameContaining(String name);

    Iterable<Wallet>findAllByUserId(Long id);

}
