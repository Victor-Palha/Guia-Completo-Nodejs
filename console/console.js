//Algumas utilizações além do CONSOLE.LOG
console.log('Hello World')

//error: pega as informações da linha que foi executada
console.error(new Error('TEMOS ERROS AQUI... PROVÁVELMENTE, PEGA VISÃO AI MENÓ:'))

//table: printa informações em forma de tabela

const array = ['Mago', 'Guerreiro', 'Clérigo', 'Paladino', 'Bruxo', 'Bardo', 'Monge', 'Barbáro', 'Feiticeiro', 'Druida']
console.table(array)

const objeto = {
    "index": 0,
    "name": "Caçadora de dados",
    "type": "Ofensivo",
    "atk": 15,
    "hp": 30,
    "def": 10
}
console.table(objeto)

//count: Conta quantas vezes o código rodou

for(i=0; i<10;i++){
    console.count('contador')
    if(i == 4){
        console.countReset('contador')
        console.log('Resetando contador quando chega em 5')
    }
}

//Time: contador de tempo de código
console.time('c')
for(i=0; i<10;i++){
    
    console.count('contador')
    if(i == 4){
        console.countReset('contador')
        console.log('Resetando contador quando chega em 5')
    }
}
console.timeEnd('c')

//assert: printa na tela se algo der errado (se o paramentro dela for false, use para testar condições que devem ser falsas)
var muitoDindin = false
if(muitoDindin == true){
    console.log('Nice')
}else{
    console.assert(false, 'Deu ruim')   
}


//clear: bom, o nome já é bem intuitivo, né? ele limpa o console

//console.clear()