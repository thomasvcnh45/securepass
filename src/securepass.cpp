#include <iostream>
#include <string>
#include <random>
#include <emscripten/emscripten.h>

extern "C" {
EMSCRIPTEN_KEEPALIVE
const char* generatePassword() {
    static std::string result;
    const std::string charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    result.clear();
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> dist(0, charset.size() - 1);
    const int length = 16; // Tu peux remplacer par un argument si tu veux
    for (int i = 0; i < length; ++i) {
        result += charset[dist(gen)];
    }
    return result.c_str();
}
}