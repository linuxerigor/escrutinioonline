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

    uint private limiteParticipantes;
    uint private totalVotos;

    mapping(address => Participante) private participantes;

    Proposto[] private propostos;

    event SavedVoto(address chaveUnica, uint proposto, bytes32 nome);

    constructor(bytes32[] memory propostoNome, uint participantes_) public {
        limiteParticipantes = participantes_;
        totalVotos = 0;

        for (uint i = 0; i < propostoNome.length; i++) {
            propostos.push(Proposto({
                id: i,
                nome: propostoNome[i],
                existe: true,
                votoTotal: 0
            }));
        }
    }

    function voto(address chaveUnica, uint proposto) public {

        require(totalVotos < limiteParticipantes, "Votacao terminada.");
        require(propostos[proposto].existe,"Candidado nao existe.");
        require(!participantes[chaveUnica].votado,"Voce ja votou.");

        participantes[chaveUnica].votado = true;
        participantes[chaveUnica].chaveUnica = chaveUnica;
        participantes[chaveUnica].voto = proposto;
        propostos[proposto].votoTotal += 1;
        totalVotos += 1;

        emit SavedVoto(chaveUnica, proposto, propostos[proposto].nome);

    }


    function votacaoTerminada() public view
            returns (bool votacaoterminada_)
    {
      if(totalVotos < limiteParticipantes)
        votacaoterminada_ = false;
        else
        votacaoterminada_ = true;

    }

    function getTotalVotos() public view
            returns (uint totalVotos_)
    {
        totalVotos_ = totalVotos;
    }

    function totalPropostos() public view
            returns (uint totalPropostos_)
    {
        totalPropostos_ = propostos.length;
    }

     function getLimiteParticipantes() public view
            returns (uint participantes_)
    {
        participantes_ = limiteParticipantes;
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

    function audityVoto(address chaveUnica) public view
            returns (uint Voto_)
    {
        Voto_ = participantes[chaveUnica].voto;
    }

}
