import React, { useState } from 'react';
import './ModalAdicionarConteudo.css';

const MATERIAS = ["Português", "Matemática", "Ciências", "História", "Geografia", "Artes", "Ed. Física", "Inglês"];

function ModalAdicionarConteudo({ turmaId, onClose, onAddConteudo, user }) {
    const [materia, setMateria] = useState(MATERIAS[0]);
    const [descricao, setDescricao] = useState("");
    const [fotos, setFotos] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length > 4) {
            alert("Você pode enviar no máximo 4 fotos por vez.");
            setFotos(files.slice(0, 4));
        } else {
            setFotos(files);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!descricao && fotos.length === 0) {
            alert("Você precisa adicionar uma descrição ou pelo menos uma foto.");
            return;
        }

        const temFotos = fotos.length > 0;

        const novoConteudo = {
            id: Date.now(),
            autor: user.displayName,
            data: new Date().toLocaleDateString('pt-BR'),
            turmaId,
            materia,
            tipo: temFotos ? 'imagem' : 'texto',
            conteudo: temFotos 
                ? fotos.map(file => URL.createObjectURL(file)) 
                : descricao 
        };

        onAddConteudo(novoConteudo);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>Adicionar Conteúdo</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="materia">Matéria</label>
                        <select id="materia" value={materia} onChange={e => setMateria(e.target.value)}>
                            {MATERIAS.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="descricao">Descrição (O que o professor passou? Dica de prova?)</label>
                        <textarea 
                            id="descricao" 
                            rows="4"
                            value={descricao}
                            onChange={e => setDescricao(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="foto">...ou envie até 4 fotos do caderno</label>
                        <input 
                            type="file" 
                            id="foto" 
                            accept="image/*"
                            multiple 
                            onChange={handleFileChange}
                        />
                        {fotos.length > 0 && <p className="fotos-selecionadas">{fotos.length} foto(s) selecionada(s).</p>}
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="btn-cancelar" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="btn-salvar">Salvar Conteúdo</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalAdicionarConteudo;
