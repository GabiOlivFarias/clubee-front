import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./HtmlTestPage.css";

function HtmlTestPage() {
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);

  const submit = () => {
    if (answer === "h1") {
      setResult("✔ Parabéns! Você passou no teste! 🎉");
    } else {
      setResult("❌ Resposta incorreta. Tente novamente.");
    }
  };

  return (
    <div className="test-container">
      <h2>Teste Final — HTML</h2>

      <p>Qual tag representa um título principal?</p>

      <label><input type="radio" name="q1" value="p" onChange={(e)=>setAnswer(e.target.value)} /> &lt;p&gt;</label>
      <label><input type="radio" name="q1" value="img" onChange={(e)=>setAnswer(e.target.value)} /> &lt;img&gt;</label>
      <label><input type="radio" name="q1" value="h1" onChange={(e)=>setAnswer(e.target.value)} /> &lt;h1&gt;</label>

      <button className="test-btn" onClick={submit}>Enviar</button>

      {result && <p className="result">{result}</p>}

      <Link to="/trilha/html" className="back-btn">⬅ Voltar</Link>
    </div>
  );
}

export default HtmlTestPage;
