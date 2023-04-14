import { test, expect } from 'vitest'
//  Teste de exemplo
test.skip('testando test?', () => {
    // fazer uma ação
    const response = true
    // O resultado esperado TEM que ser igual ao resultado da ação
    expect(response).toEqual(true)
})
