import {Atendimento, FiltrarAtendimentosParams} from '../types/atendimentosTypes';
import {filtrarAtendimentos} from './filtrarAtendimentosService';

export function exportarAtendimentos(filtros: FiltrarAtendimentosParams): Atendimento[] {
    return filtrarAtendimentos(filtros);
}