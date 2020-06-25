pragma solidity >=0.4.22 <0.7.0;
// SPDX-License-Identifier: UNLICENSED

/// @title Escrutinio online.
contract Escrutinio {

    struct Participante {
        bool votado;
        address chaveUnica;
        uint voto;
    }

    struct Proposto {
        uint id;
        bytes32 nome;
        uint votoTotal;
        bool existe;
    }

    uint256 public totalParticipantes;
    uint256 public totalVotos;

    mapping(address => Participante) public participantes;

    Proposto[] public propostos;

    //event SavedVoto(address chaveUnica, uint proposto);

    constructor(bytes32[] memory propostoNome) public {
        totalParticipantes = uint256(propostoNome[propostoNome.length - 1]);
        totalVotos = 0;

        for (uint i = 0; i < propostoNome.length - 1; i++) {
            propostos.push(Proposto({
                id: i,
                nome: propostoNome[i],
                existe: true,
                votoTotal: 0
            }));
        }
    }

    function voto(address chaveUnica, uint proposto) public {

        require(totalVotos < totalParticipantes, "Votacao terminada.");
        require(propostos[proposto].existe,"Candidado nao existe.");
        require(!participantes[chaveUnica].votado,"Voce ja votou.");

        participantes[chaveUnica].votado = true;
        participantes[chaveUnica].chaveUnica = chaveUnica;
        participantes[chaveUnica].voto = proposto;
        propostos[proposto].votoTotal += 1;
        totalVotos += 1;

        //emit SavedVoto(chaveUnica, proposto);

    }


    function votacaoTerminada() public view
            returns (bool votacaoterminada_)
    {
      if(propostos.length < totalParticipantes)
        votacaoterminada_ = false;
        else
        votacaoterminada_ = true;

    }

    function totalPropostos() public view
            returns (uint totalPropostos_)
    {
        totalPropostos_ = propostos.length;
    }

    function proposalNameByPos(uint i) public view
            returns (bytes32 propostosName_)
    {
        propostosName_ = propostos[i].nome;
    }

    function proposalVotesByPos(uint i) public view
            returns (uint totalVotos_)
    {
        totalVotos_ = propostos[i].votoTotal;
    }

}
