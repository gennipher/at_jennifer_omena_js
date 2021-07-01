function limpar(el) {
    while (el.firstChild) {
        el.firstChild.remove()
    }
}

(() => {
    let $container = document.getElementById('app')
    let $h1 = document.createElement('h1')
    let $tabela1 = document.createElement('table')
    let $titulotime = $tabela1.createTHead().insertRow()
    let $titulo1 = $tabela1.createTHead().insertRow()
    let $tabela2 = document.createElement('table')
    let $tituloPartida = $tabela2.createTHead().insertRow()
    let $titulo2 = $tabela2.createTHead().insertRow()

    $container.append($h1)
    $container.append($tabela1)
    $container.append($tabela2)

    $h1.innerText = 'Campeonato - AT Jennifer Omena'

    $tabela1.className = 'table table-bordered classification'

    $titulotime.innerText = 'CLASSIFICAÇÃO'

    $titulo1.insertCell(-1).innerText = 'TIME'
    $titulo1.insertCell(-1).innerText = 'PONTOS'
    $titulo1.insertCell(-1).innerText = 'VITORIAS'
    $titulo1.insertCell(-1).innerText = 'EMPATES'
    $titulo1.insertCell(-1).innerText = 'DERROTAS'

    $tabela2.className = 'table table-bordered points'

    $tituloPartida.innerText = 'PARTIDA'

    $titulo2.insertCell(-1).innerText = 'CASA'
    $titulo2.insertCell(-1).innerText = 'VITORIA'
    $titulo2.insertCell(-1).innerText = 'EMPATE'
    $titulo2.insertCell(-1).innerText = 'DERROTA DA CASA'
    $titulo2.insertCell(-1).innerText = 'VISITANTE'

    let $corpo1 = $tabela1.createTBody()
    let $corpo2 = $tabela2.createTBody()


    class TIME {
      constructor(nome, pontos, vitorias, empates, derrotas) {
        this.nome = nome;
        this.pontos = pontos;
        this.vitorias = vitorias;
        this.empates = empates;
        this.derrotas = derrotas;
      }
    }

    let timeA = new TIME("A", 0, 0, 0, 0)
    let timeB = new TIME("B", 0, 0, 0, 0)
    let timeC = new TIME("C", 0, 0, 0, 0)
    let timeD = new TIME("D", 0, 0, 0, 0)

    let times = [timeA, timeB, timeC, timeD]

    let partidas = [
        { casa: timeA, vitoria: false, empate: false, derrotaDaCasa: false, visitante: timeB },
        { casa: timeC, vitoria: false, empate: false, derrotaDaCasa: false, visitante: timeD },
        { casa: timeA, vitoria: false, empate: false, derrotaDaCasa: false, visitante: timeC },
        { casa: timeB, vitoria: false, empate: false, derrotaDaCasa: false, visitante: timeD },
        { casa: timeA, vitoria: false, empate: false, derrotaDaCasa: false, visitante: timeD },
        { casa: timeB, vitoria: false, empate: false, derrotaDaCasa: false, visitante: timeC },
    ];

    function criarTabelaClassificacao($corpo1, times) {
        limpar($corpo1)
        for (let time of times) {
            let $linha = $corpo1.insertRow()

            let $nome = $linha.insertCell(-1)
            let $pontos = $linha.insertCell(-1)
            let $vitorias = $linha.insertCell(-1)
            let $empates = $linha.insertCell(-1)
            let $derrotas = $linha.insertCell(-1)

            $nome.innerText = time.nome
            $pontos.innerText = time.pontos
            $vitorias.innerText = time.vitorias
            $empates.innerText = time.empates
            $derrotas.innerText = time.derrotas
        }
    }

    function criarTabelaPartidas($corpo2, partidas) {
      for (let partida of partidas) {

        let $linha = $corpo2.insertRow()

        let $nomeCasa = $linha.insertCell(-1)
        $nomeCasa.innerText = partida.casa.nome

        let $vitoria = $linha.insertCell(-1)
        let $empate = $linha.insertCell(-1)
        let $derrotaDaCasa = $linha.insertCell(-1)

        $vitoria.className = 'victory'
        $empate.className = 'draw'
        $derrotaDaCasa.className = 'loser'

        $vitoria.onclick = (e) => {
          if ($vitoria.className === "victory bg-success" || $empate.className === "draw bg-warning" || $derrotaDaCasa.className === "loser bg-danger") {
            
            $vitoria.className = 'victory'
            partida.vitoria = false

            times.forEach(item => {
              if (item.nome === partida.casa.nome ) {
                item.pontos -= 3
                item.vitorias -= 1
                partida.visitante.derrotas -= 1

                $empate.style.pointerEvents = "initial"
                $derrotaDaCasa.style.pointerEvents = "initial"
              }              
            })

            criarTabelaClassificacao($corpo1, times)
            
          } else {
            
            $vitoria.className = 'victory bg-success'
            partida.vitoria = true            
            
            times.forEach(item => {
              if (item.nome === partida.casa.nome) {
                item.pontos += 3
                item.vitorias += 1
                partida.visitante.derrotas += 1

                $empate.style.pointerEvents = "none"
                $derrotaDaCasa.style.pointerEvents = "none"
              }
            })

            criarTabelaClassificacao($corpo1, times)
          }               
        }

        $empate.onclick = (e) => {
          if ($vitoria.className === "victory bg-success" || $empate.className === "draw bg-warning" || $derrotaDaCasa.className === "loser bg-danger") {

              $empate.className = 'draw'
              partida.empate = false

              times.forEach(item => {
                if (item.nome === partida.casa.nome) {
                  item.empates -= 1
                  item.pontos -=1
                  partida.visitante.pontos -= 1
                  partida.visitante.empates -= 1  

                  $vitoria.style.pointerEvents = "initial"
                  $derrotaDaCasa.style.pointerEvents = "initial"
                }
              })

              criarTabelaClassificacao($corpo1, times)

          } else {
            $empate.className = 'draw bg-warning'
            partida.empate = true
          
            times.forEach(item => {
              if (item.nome === partida.casa.nome) {
                item.empates += 1
                item.pontos +=1
                partida.visitante.pontos += 1
                partida.visitante.empates += 1

                $vitoria.style.pointerEvents = "none"
                $derrotaDaCasa.style.pointerEvents = "none"
              }
            })

            criarTabelaClassificacao($corpo1, times)
          }
        }

        $derrotaDaCasa.onclick = (e) => {
          if ($vitoria.className === "victory bg-success" || $empate.className === "draw bg-warning" || $derrotaDaCasa.className === "loser bg-danger") {

            $derrotaDaCasa.className = 'loser'
            partida.derrotaDaCasa = false

            times.forEach(item => {
              if (item.nome === partida.casa.nome) {
                item.derrotas -= 1
                partida.visitante.pontos -= 3
                partida.visitante.vitorias -= 1

                $vitoria.style.pointerEvents = "initial"
                $empate.style.pointerEvents = "initial"
              }
            })

            criarTabelaClassificacao($corpo1, times)

          } else {
            $derrotaDaCasa.className = 'loser bg-danger'
            partida.derrotaDaCasa = true
            

            times.forEach(item => {
              if (item.nome === partida.casa.nome) {
                item.derrotas += 1
                partida.visitante.pontos += 3
                partida.visitante.vitorias += 1

                $vitoria.style.pointerEvents = "none"
                $empate.style.pointerEvents = "none"
              }
            })

            criarTabelaClassificacao($corpo1, times)
          }
        }

        let $visitante = $linha.insertCell(-1)
        $visitante.innerText = partida.visitante.nome
      }
    }

    criarTabelaClassificacao($corpo1, times)
    criarTabelaPartidas($corpo2, partidas)

})()