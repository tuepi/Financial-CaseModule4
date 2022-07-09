package com.example.financial_case_module_4.service.wallet;

import com.example.financial_case_module_4.model.User;
import com.example.financial_case_module_4.model.Wallet;
import com.example.financial_case_module_4.repository.IWalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class WalletService implements IWalletService{
    @Autowired
    private IWalletRepository walletRepository;
    public Iterable<Wallet> findAll() {
        return walletRepository.findAll();
    }

    public Optional<Wallet> findById(Long id) {
        return walletRepository.findById(id);
    }

    public Wallet save(Wallet wallet) {
        return walletRepository.save(wallet);
    }

    public void remove(Long id) {
        walletRepository.deleteById(id);
    }

    public Iterable<Wallet> findAllByNameContaining(String name) {
        return walletRepository.findAllByNameContaining(name);
    }

    @Override
    public Iterable<Wallet> findAllByUserId(Long id) {
        return walletRepository.findAllByUserId(id);
    }
}
