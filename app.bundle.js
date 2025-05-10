// --- Constantes SBP 2021 ---
const LEITES = [
  {
    label: "Leite materno puro",
    value: "materno",
    kcal: 0.67,
    prot: 0.011,
    tooltip: "Leite materno puro: 0,67 kcal/mL, 1,1 g/100mL proteína. (SBP 2021, p. 58–60)",
    ref: "https://www.sbp.com.br/fileadmin/user_upload/Manual_de_atualidades_em_Nutrologia_2021_-_SBP_SITE.pdf#page=58"
  },
  {
    label: "Leite materno fortificado",
    value: "fortificado",
    kcal: 0.80,
    prot: 0.026,
    tooltip: "Leite materno fortificado: 0,80 kcal/mL, 2,6 g/100mL proteína. (SBP 2021, p. 60)",
    ref: "https://www.sbp.com.br/fileadmin/user_upload/Manual_de_atualidades_em_Nutrologia_2021_-_SBP_SITE.pdf#page=60"
  },
  {
    label: "Fórmula pré-termo (<1,8 kg)",
    value: "prematuro",
    kcal: 0.81,
    prot: 0.027,
    tooltip: "Fórmula pré-termo: 0,81 kcal/mL, 2,7 g/100mL proteína. (SBP 2021, p. 232)",
    ref: "https://www.sbp.com.br/fileadmin/user_upload/Manual_de_atualidades_em_Nutrologia_2021_-_SBP_SITE.pdf#page=232"
  },
  {
    label: "Fórmula termo",
    value: "termo",
    kcal: 0.70,
    prot: 0.012,
    tooltip: "Fórmula termo: 0,70 kcal/mL, 1,2 g/100mL proteína. (Guia Prático 0–5 anos, p. 45)",
    ref: "https://spdf.com.br/wp-content/uploads/2021/10/23148c-GPrat_Aliment_Cr_0-5_anos_SITE__002_.pdf#page=45"
  },
  {
    label: "Fórmula de transição",
    value: "transicao",
    kcal: 0.73,
    prot: 0.020,
    tooltip: "Fórmula de transição: 0,73 kcal/mL, 2,0 g/100mL proteína. (SBP 2021, p. 234)",
    ref: "https://www.sbp.com.br/fileadmin/user_upload/Manual_de_atualidades_em_Nutrologia_2021_-_SBP_SITE.pdf#page=234"
  },
  {
    label: "Personalizado",
    value: "personalizado",
    kcal: 0.7,
    prot: 0.01,
    tooltip: "Informe o valor calórico (kcal/mL) e proteico (g/mL) do leite.",
    ref: ""
  }
];

const COMORBIDADES = [
  { label: "DBP", value: "dbp", alertType: "warning", min: 140, max: 150, severity: "warning", refUrl: "https://www.sbp.com.br/fileadmin/user_upload/Manual_de_atualidades_em_Nutrologia_2021_-_SBP_SITE.pdf#page=59" },
  { label: "Enterocolite Necrosante (NEC)", value: "nec", alertType: "error", min: null, max: null, severity: "error", refUrl: "https://www.sbp.com.br/fileadmin/user_upload/24651c-ManSeguimento_RN_AltoRisco_MIOLO.pdf#page=120" },
  { label: "Cardiopatia Congênita", value: "cardiopatia", alertType: "error", min: null, max: null, severity: "error", refUrl: "https://www.sbp.com.br/fileadmin/user_upload/24651c-ManSeguimento_RN_AltoRisco_MIOLO.pdf#page=110" },
  { label: "Insuficiência Renal Aguda", value: "renal", alertType: "error", min: null, max: null, severity: "error", refUrl: "https://www.sbp.com.br/fileadmin/user_upload/24651c-ManSeguimento_RN_AltoRisco_MIOLO.pdf#page=140" },
  { label: "Sepse", value: "sepse", alertType: "error", min: 120, max: 140, severity: "error", refUrl: "https://www.sbp.com.br/fileadmin/user_upload/24651c-ManSeguimento_RN_AltoRisco_MIOLO.pdf#page=150" },
  { label: "Hiperbilirrubinemia", value: "bili", alertType: "warning", min: null, max: null, severity: "warning", refUrl: "https://www.sbp.com.br/fileadmin/user_upload/24651c-ManSeguimento_RN_AltoRisco_MIOLO.pdf#page=128" }
];

const FAIXAS = {
  hidrica: { min: 150, max: 200, ref: "https://www.sbp.com.br/fileadmin/user_upload/Manual_de_atualidades_em_Nutrologia_2021_-_SBP_SITE.pdf#page=59" },
  calorica: { min: 120, max: 130, ref: "https://www.sbp.com.br/fileadmin/user_upload/Manual_de_atualidades_em_Nutrologia_2021_-_SBP_SITE.pdf#page=59" },
  calorica_dbp: { min: 140, max: 150, ref: "https://www.sbp.com.br/fileadmin/user_upload/Manual_de_atualidades_em_Nutrologia_2021_-_SBP_SITE.pdf#page=59" },
  calorica_sepse: { min: 120, max: 140, ref: "https://www.sbp.com.br/fileadmin/user_upload/24651c-ManSeguimento_RN_AltoRisco_MIOLO.pdf#page=150" },
  proteica: { min: 2.5, max: 3.5, ref: "https://www.sbp.com.br/fileadmin/user_upload/Manual_de_atualidades_em_Nutrologia_2021_-_SBP_SITE.pdf#page=59" },
  proteica_sepse: { min: 3.5, max: 4.0, ref: "https://www.sbp.com.br/fileadmin/user_upload/24651c-ManSeguimento_RN_AltoRisco_MIOLO.pdf#page=150" }
};

// Tooltip ajustado para nunca vazar da tela e sem referência/link
function Tooltip({ text }) {
  const [show, setShow] = React.useState(false);
  const tipRef = React.useRef(null);
  function handleMouseEnter(e) {
    setShow(true);
    setTimeout(() => {
      if (tipRef.current) {
        const rect = tipRef.current.getBoundingClientRect();
        if (rect.right > window.innerWidth) {
          tipRef.current.style.left = 'auto';
          tipRef.current.style.right = '0';
          tipRef.current.style.transform = 'none';
        }
      }
    }, 10);
  }
  function handleMouseLeave() {
    setShow(false);
  }
  return (
    React.createElement("span", { className: "relative group cursor-pointer ml-1", onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave },
      React.createElement("span", { className: "text-blue-200" }, "ℹ️"),
      show && React.createElement("span", {
        ref: tipRef,
        className: "absolute z-10 left-0 mt-2 w-64 max-w-xs p-2 bg-gray-700 border border-gray-400 rounded shadow-lg text-xs text-white opacity-100 transition pointer-events-none whitespace-pre-line break-words",
        style: { minWidth: 120 }
      },
        text
      )
    )
  );
}

// InputField
function InputField({ label, tooltip, refUrl, showInfo, ...props }) {
  return (
    React.createElement("label", { className: "flex flex-col mb-2" },
      React.createElement("span", { className: "flex items-center font-medium text-white" },
        label,
        showInfo && tooltip && React.createElement(Tooltip, { text: tooltip })
      ),
      React.createElement("input", { className: "mt-1 p-2 border rounded focus:outline-none focus:ring bg-gray-500 text-white border-gray-400 placeholder-gray-200", ...props })
    )
  );
}

// Novo campo para IG ao Nascer (Semanas e Dias)
function IGField({ semanas, dias, setSemanas, setDias }) {
  function handleSemanas(e) {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 2) v = v.slice(0,2);
    if (Number(v) > 45) v = "45";
    setSemanas(v);
  }
  function handleDias(e) {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 1) v = v.slice(0,1);
    if (Number(v) > 6) v = "6";
    setDias(v);
  }
  return (
    React.createElement("div", { className: "flex gap-2 mb-2" },
      React.createElement(InputField, {
        label: "IG ao Nascer (semanas)",
        type: "number",
        min: "20",
        max: "45",
        value: semanas,
        onChange: handleSemanas,
        onPaste: e => { e.preventDefault(); },
      }),
      React.createElement(InputField, {
        label: "(dias)",
        type: "number",
        min: "0",
        max: "6",
        value: dias,
        onChange: handleDias,
        onPaste: e => { e.preventDefault(); },
      })
    )
  );
}

// Novo campo para Idade Atual (anos, meses, dias)
function IdadeAtualField({ anos, meses, dias, setAnos, setMeses, setDias }) {
  function handleAnos(e) {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 1) v = v.slice(0,1);
    if (Number(v) > 5) v = "5";
    setAnos(v);
  }
  function handleMeses(e) {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 2) v = v.slice(0,2);
    if (Number(v) > 12) v = "12";
    setMeses(v);
  }
  function handleDias(e) {
    let v = e.target.value.replace(/\D/g, "");
    setDias(v);
  }
  return (
    React.createElement("div", { className: "flex flex-wrap gap-2 mb-2 w-full" },
      React.createElement(InputField, {
        label: "Idade Atual (anos)",
        type: "number",
        min: "0",
        max: "5",
        value: anos,
        onChange: handleAnos,
        onPaste: e => { e.preventDefault(); },
        style: { flex: 1, minWidth: 60, maxWidth: 100 }
      }),
      React.createElement(InputField, {
        label: "(meses)",
        type: "number",
        min: "0",
        max: "12",
        value: meses,
        onChange: handleMeses,
        onPaste: e => { e.preventDefault(); },
        style: { flex: 1, minWidth: 60, maxWidth: 100 }
      }),
      React.createElement(InputField, {
        label: "(dias)",
        type: "number",
        min: "0",
        value: dias,
        onChange: handleDias,
        onPaste: e => { e.preventDefault(); },
        style: { flex: 1, minWidth: 60, maxWidth: 100 }
      })
    )
  );
}

// LeiteDropdown
function LeiteDropdown({ value, onChange, kcal, prot, onKcalChange, onProtChange }) {
  return (
    React.createElement("div", { className: "mb-2" },
      React.createElement("label", { className: "font-medium flex items-center text-white" },
        "Tipo de leite",
        React.createElement(Tooltip, { text: "Escolha o tipo de leite. O coeficiente calórico está ao lado." })
      ),
      React.createElement("select", {
        className: "mt-1 p-2 border rounded w-full bg-gray-500 text-white border-gray-400 appearance-none",
        value: value,
        onChange: e => onChange(e.target.value)
      },
        LEITES.map(l =>
          React.createElement("option", { key: l.value, value: l.value }, l.value === "personalizado" ? l.label : `${l.label} (${l.kcal.toFixed(2)} kcal/mL)`)
        )
      ),
      value === "personalizado" && React.createElement("div", { className: "flex gap-2 mt-2" },
        React.createElement(InputField, {
          label: "kcal/mL",
          type: "number",
          min: "0",
          step: "0.01",
          value: kcal,
          onChange: e => onKcalChange(e.target.value)
        }),
        React.createElement(InputField, {
          label: "g proteína/mL",
          type: "number",
          min: "0",
          step: "0.001",
          value: prot,
          onChange: e => onProtChange(e.target.value)
        })
      )
    )
  );
}

// Comorbidades do RN responsivo
function Comorbidades({ values, onChange }) {
  return (
    React.createElement("div", { className: "mb-2" },
      React.createElement("span", { className: "font-medium text-white" }, "Comorbidades do RN"),
      React.createElement("div", { className: "flex flex-wrap gap-2 mt-1 w-full" },
        COMORBIDADES.map(c => (
          React.createElement("label", {
            key: c.value,
            className: "flex items-center gap-1 min-w-[140px] p-1 bg-gray-600 rounded"
          },
            React.createElement("input", {
              type: "checkbox",
              checked: values.includes(c.value),
              onChange: e => {
                if (e.target.checked) onChange([...values, c.value]);
                else onChange(values.filter(v => v !== c.value));
              }
            }),
            c.label
          )
        ))
      )
    )
  );
}

// Inputs de cota calórica e volume ingerido: desabilite um se o outro estiver preenchido, com tooltip
function InputFieldWithDisable({ label, tooltip, refUrl, disabled, disabledMsg, showInfo, ...props }) {
  return (
    React.createElement("label", { className: "flex flex-col mb-2 relative" },
      React.createElement("span", { className: "flex items-center font-medium text-white" },
        label,
        showInfo && tooltip && React.createElement(Tooltip, { text: tooltip })
      ),
      React.createElement("input", {
        className: `mt-1 p-2 border rounded focus:outline-none focus:ring bg-gray-500 text-white border-gray-400 placeholder-gray-200 ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`,
        disabled,
        ...props,
        onMouseOver: disabled && disabledMsg ? (e => {
          const tip = document.createElement('div');
          tip.innerText = disabledMsg;
          tip.style.position = 'fixed';
          tip.style.background = '#222';
          tip.style.color = '#fff';
          tip.style.padding = '4px 8px';
          tip.style.borderRadius = '4px';
          tip.style.fontSize = '12px';
          tip.style.zIndex = 9999;
          tip.style.top = (e.clientY + 10) + 'px';
          tip.style.left = (e.clientX + 10) + 'px';
          tip.id = 'input-disable-tip';
          document.body.appendChild(tip);
        }) : undefined,
        onMouseOut: disabled && disabledMsg ? (() => {
          const tip = document.getElementById('input-disable-tip');
          if (tip) tip.remove();
        }) : undefined
      })
    )
  );
}

// AlertaComorbidades: mostra alertas de comorbidades apenas uma vez
function AlertaComorbidades({ comorbidades }) {
  const comorbCriticas = [
    { value: "dbp", msg: "⚠️ DBP: Recomenda-se cota calórica de 140–150 kcal/kg/dia. Consulte manual.", severity: "warning", ref: "https://www.sbp.com.br/fileadmin/user_upload/Manual_de_atualidades_em_Nutrologia_2021_-_SBP_SITE.pdf#page=59" },
    { value: "nec", msg: "⚠️ NEC: Protocolos de feeding mínimos e avanço gradual. Pode haver imprecisão, consulte manual.", severity: "error", ref: "https://www.sbp.com.br/fileadmin/user_upload/24651c-ManSeguimento_RN_AltoRisco_MIOLO.pdf#page=120" },
    { value: "cardiopatia", msg: "⚠️ Cardiopatia: Restrição de volume e densidade energética alta. Pode haver imprecisão, consulte manual.", severity: "error", ref: "https://www.sbp.com.br/fileadmin/user_upload/24651c-ManSeguimento_RN_AltoRisco_MIOLO.pdf#page=110" },
    { value: "renal", msg: "⚠️ IRA: Limite hídrico e aporte protéico/calórico aumentado. Pode haver imprecisão, consulte manual.", severity: "error", ref: "https://www.sbp.com.br/fileadmin/user_upload/24651c-ManSeguimento_RN_AltoRisco_MIOLO.pdf#page=140" },
    { value: "sepse", msg: "⚠️ Sepse Grave: Calorias até 140 kcal/kg/dia e proteína 3,5–4 g/kg/dia. Pode haver imprecisão, consulte manual.", severity: "error", ref: "https://www.sbp.com.br/fileadmin/user_upload/24651c-ManSeguimento_RN_AltoRisco_MIOLO.pdf#page=150" },
    { value: "bili", msg: "Hiperbilirrubinemia: Cuidados pós-fototerapia. Pode haver imprecisão, consulte manual.", severity: "error", ref: "https://www.sbp.com.br/fileadmin/user_upload/24651c-ManSeguimento_RN_AltoRisco_MIOLO.pdf#page=128" }
  ];
  const alerts = comorbCriticas.filter(c => comorbidades.includes(c.value)).map(c =>
    React.createElement(
      "div",
      {
        key: c.value,
        className:
          c.severity === "error"
            ? "bg-red-200 border-l-4 border-red-700 text-red-900 p-2 my-2 text-sm rounded flex items-center"
            : "bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-2 my-2 text-sm rounded flex items-center"
      },
      c.msg,
      " — ",
      React.createElement("a", { href: c.ref, target: "_blank", rel: "noopener noreferrer", className: "underline" }, "Ver manual")
    )
  );
  if (alerts.length > 0) {
    return React.createElement(React.Fragment, null, alerts);
  }
  return null;
}

// ErrorBoundary para capturar erros e evitar crash
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // Envie para sua planilha SheetDB
    fetch('https://sheetdb.io/api/v1/ulsgwjogs4f7y', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: error.toString(),
        errorInfo: JSON.stringify(errorInfo),
        datetime: new Date().toISOString()
      })
    });
  }
  handleReset = () => {
    this.setState({ hasError: false });
    window.location.reload();
  }
  render() {
    if (this.state.hasError) {
      return (
        React.createElement("div", { className: "p-8 text-center" },
          React.createElement("h2", { className: "text-xl text-red-600 font-bold mb-4" }, "Ocorreu um erro inesperado 😥"),
          React.createElement("button", {
            className: "bg-green-600 text-white px-4 py-2 rounded",
            onClick: this.handleReset
          }, "Tentar novamente")
        )
      );
    }
    return this.props.children;
  }
}

// Validação defensiva em AlertaSBP
function AlertaSBP({ tipo, valor, comorbidades }) {
  let faixa, label;
  if (tipo === "hidrica") {
    faixa = FAIXAS.hidrica;
    label = "ATENÇÃO: A SBP recomenda uma Cota hídrica de 150–200 mL/kg/dia";
  } else if (tipo === "calorica") {
    if (comorbidades && comorbidades.includes("dbp")) {
      faixa = FAIXAS.calorica_dbp;
      label = "ATENÇÃO: A SBP recomenda uma Cota calórica de 140–150 kcal/kg/dia para pacientes com Displasia Broncopulmonar";
    } else if (comorbidades && comorbidades.includes("sepse")) {
      faixa = FAIXAS.calorica_sepse;
      label = "ATENÇÃO: A SBP recomenda uma Cota calórica de 120–140 kcal/kg/dia para Sepse";
    } else {
      faixa = FAIXAS.calorica;
      label = "ATENÇÃO: A SBP recomenda uma Cota calórica de 120–130 kcal/kg/dia";
    }
  } else if (tipo === "proteica") {
    if (comorbidades && comorbidades.includes("sepse")) {
      faixa = FAIXAS.proteica_sepse;
      label = "ATENÇÃO: A SBP recomenda uma Cota proteica de 3,5–4,0 g/kg/dia para Sepse";
    } else {
    faixa = FAIXAS.proteica;
      label = "ATENÇÃO: A SBP recomenda uma Cota proteica de 2,5–3,5 g/kg/dia";
    }
  }
  if (!faixa) {
    return React.createElement("div", { className: "text-red-600" }, "Erro interno: faixa não definida.");
  }
  let sbpAlert = null;
  if (valor < faixa.min || valor > faixa.max) {
    sbpAlert = React.createElement("div", { className: "bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-2 my-2 text-sm rounded flex items-center" },
        label
    );
  }
  if (sbpAlert) {
    return React.createElement(React.Fragment, null, sbpAlert);
  }
  return null;
}

// Refatorar DiferencaFaixa para mostrar texto excedente/faltante em negrito colorido
function DiferencaFaixa({ valor, faixa, unidade }) {
  if (valor < faixa.min) {
    return React.createElement(
      "span",
      { className: "inline-flex items-center ml-2" },
      React.createElement("span", { className: "text-red-500 font-bold" }, `(-${(faixa.min - valor).toFixed(2)} ${unidade})`)
    );
  } else if (valor > faixa.max) {
    return React.createElement(
      "span",
      { className: "inline-flex items-center ml-2" },
      React.createElement("span", { className: "font-bold", style: { color: '#155C22' } }, `(+${(valor - faixa.max).toFixed(2)} ${unidade})`)
    );
  } else {
    return React.createElement(
      "span",
      { className: "inline-flex items-center ml-2" },
      React.createElement("span", { className: "font-bold", style: { color: '#22c55e' } }, "✅")
    );
  }
}

// Tooltip simples para valores
function TooltipValor({ children, texto }) {
  const [show, setShow] = React.useState(false);
  return React.createElement(
    "span",
    {
      className: "relative cursor-pointer",
      onMouseEnter: () => setShow(true),
      onMouseLeave: () => setShow(false)
    },
    children,
    show && React.createElement(
      "span",
      {
        className: "absolute z-20 left-1/2 -translate-x-1/2 mt-6 px-2 py-1 bg-gray-800 text-xs text-white rounded shadow border border-gray-400 whitespace-nowrap",
        style: { top: '100%' }
      },
      texto
    )
  );
}

// Corrigir GraficoComparativo para barra SBP começar em faixa.min e terminar em faixa.max
function GraficoComparativo({ titulo, faixa, valor, unidade }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current) return;
    if (ref.current.chart) {
      ref.current.chart.destroy();
      ref.current.chart = null;
    }
    // Barra SBP: invisível até min, depois cinza até max
    // Barra Calculado: valor
    const invisivel = faixa.min;
    const sbpBar = faixa.max - faixa.min;
    const calcBar = valor;
    // Inverter tons de verde: verde escuro (#155C22) para excedente, verde normal (#22c55e) para dentro da faixa
    const corCalc = (valor >= faixa.min && valor <= faixa.max) ? '#22c55e' : (valor > faixa.max ? '#155C22' : '#dc2626');
    ref.current.chart = new window.Chart(ref.current.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["SBP", "Calculado"],
        datasets: [
          // SBP: invisível até min, depois cinza até max
          {
            label: 'Invisível',
            data: [invisivel, 0],
            backgroundColor: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)'],
            stack: 'sbp',
            barThickness: 18,
            categoryPercentage: 0.6,
            barPercentage: 0.8
          },
          {
            label: 'Faixa SBP',
            data: [sbpBar, 0],
            backgroundColor: ['#d1d5db', 'rgba(0,0,0,0)'],
            stack: 'sbp',
            barThickness: 18,
            categoryPercentage: 0.6,
            barPercentage: 0.8
          },
          // Calculado: só na linha "Calculado"
          {
            label: 'Calculado',
            data: [0, calcBar],
            backgroundColor: ['rgba(0,0,0,0)', corCalc],
            stack: 'calc',
            barThickness: 18,
            categoryPercentage: 0.6,
            barPercentage: 0.8
          }
        ]
      },
      options: {
        indexAxis: "y",
        plugins: {
          legend: { display: false },
          title: { display: false },
          tooltip: {
            enabled: true,
            callbacks: {
              label: function(context) {
                if (context.dataIndex === 0 && context.dataset.label === 'Faixa SBP') {
                  return `Faixa SBP: ${faixa.min}–${faixa.max} ${unidade}`;
                } else if (context.dataIndex === 1 && context.dataset.label === 'Calculado') {
                  return `Calculado: ${valor.toFixed(2)} ${unidade}`;
                }
                return '';
              }
            },
            backgroundColor: '#222',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#fff',
            borderWidth: 1
          }
        },
        scales: {
          x: {
            min: 0,
            max: Math.max(faixa.max, valor) * 1.2,
            stacked: true,
            ticks: { color: '#fff' },
            grid: { color: 'rgba(255,255,255,0.1)' }
          },
          y: {
            stacked: true,
            ticks: { color: '#fff', font: { size: 14 } },
            grid: { color: 'rgba(255,255,255,0.1)' }
          }
        }
      }
    });
  }, [faixa, valor, titulo, unidade]);
  return (
    React.createElement("div", { className: "mb-4" },
      React.createElement("div", { className: "font-bold text-white text-base mb-1" }, titulo),
      React.createElement("canvas", { ref: ref, height: 70 }),
      React.createElement("div", { className: "text-xs text-blue-200 mt-1" },
        `Faixa SBP: ${faixa.min}–${faixa.max} ${unidade}`
      ),
      React.createElement("div", { className: "text-xs text-white mt-1" },
        `Valor calculado: ${valor.toFixed(2)} ${unidade}`
      )
    )
  );
}

// ExportarPDF: agora pede nome, leito e data antes de imprimir, insere header global no topo e remove após
function ExportarPDF() {
  function handlePrint() {
    const nome = prompt("Nome do paciente:") || "Paciente";
    const leito = prompt("Leito:") || "Leito";
    const data = new Date().toLocaleDateString();
    // Cria header global temporário
    const header = document.createElement("div");
    header.id = "print-header-global";
    header.innerHTML = `<div style='font-size:22px;font-weight:bold;margin-bottom:16px;text-align:center;'>${nome} — Leito: ${leito} — Data: ${data}</div>`;
    document.body.prepend(header);
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        const h = document.getElementById("print-header-global");
        if (h) h.remove();
      }, 500);
    }, 100);
  }
  return (
    React.createElement("button", {
      className: "bg-[#0C4B2E] text-white px-4 py-2 rounded shadow hover:bg-green-700 mt-4 no-print",
      onClick: handlePrint
    }, "Imprimir / Salvar PDF")
  );
}

// Botão de compartilhar
function ShareButton({ className = "" }) {
  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: 'Calculadora Neonatal de Cotas',
        text: 'Veja esta calculadora neonatal de cotas hídrica, calórica e proteica!',
        url: window.location.href
      });
    } else {
      alert('Compartilhamento não suportado neste dispositivo.');
    }
  }
  return (
    React.createElement("button", {
      className: `bg-[#0C4B2E] text-white px-4 py-2 rounded shadow hover:bg-green-700 mt-4 ml-2 no-print font-bold ${className}`,
      onClick: handleShare
    }, "Compartilhar")
  );
}

// Botão Reset
function ResetButton({ onReset }) {
  return (
    React.createElement("button", {
      className: "bg-gray-300 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-400 mt-4 ml-2 no-print",
      onClick: onReset
    }, "Resetar calculadora")
  );
}

// SugestoesForm
function SugestoesForm() {
  const [comentario, setComentario] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [enviado, setEnviado] = React.useState(false);
  const [erro, setErro] = React.useState("");
  const [show, setShow] = React.useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    if (!comentario.trim() || !email.trim()) {
      setErro("Por favor, preencha o e-mail e a mensagem.");
      return;
    }
    setErro("");
    setEnviado(true);
    // Envia para SheetDB
    await fetch('https://sheetdb.io/api/v1/ulsgwjogs4f7y', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        mensagem: comentario,
        datetime: new Date().toISOString()
      })
    });
    setComentario("");
    setEmail("");
    setTimeout(() => setEnviado(false), 4000);
  }
  if (!show) {
    return React.createElement("button", {
      className: "text-xs text-blue-200 underline mt-2 mb-2 no-print",
      onClick: () => setShow(true)
    }, "Dúvidas, Erros, Sugestões? Fale com o Desenvolvedor.");
  }
  return (
    React.createElement("form", { className: "mt-2 mb-2 w-64 p-2 bg-gray-500 text-white rounded shadow border border-gray-400 no-print", onSubmit: handleSubmit },
      React.createElement("label", { className: "block font-medium mb-1 text-xs text-white" }, "E-mail:"),
      React.createElement("input", {
        className: "w-full p-1 border rounded text-xs bg-gray-500 border-gray-400 text-white mb-1 placeholder-gray-200",
        type: "email",
        value: email,
        onChange: e => setEmail(e.target.value),
        placeholder: "Seu e-mail"
      }),
      React.createElement("label", { className: "block font-medium mb-1 text-xs text-white" }, "Mensagem:"),
      React.createElement("textarea", {
        className: "w-full p-1 border rounded text-xs bg-gray-500 border-gray-400 text-white mb-1 placeholder-gray-200",
        rows: 2,
        value: comentario,
        onChange: e => setComentario(e.target.value),
        placeholder: "Digite aqui..."
      }),
      erro && React.createElement("div", { className: "text-red-400 text-xs mb-1" }, erro),
      React.createElement("div", { className: "flex items-center justify-between" },
        React.createElement("button", {
          type: "submit",
          className: "bg-blue-700 text-white px-2 py-1 rounded text-xs hover:bg-blue-800"
        }, "Enviar"),
        React.createElement("button", {
          type: "button",
          className: "text-xs text-gray-200 underline ml-2",
          onClick: () => setShow(false)
        }, "Fechar")
      ),
      enviado && React.createElement("span", { className: "text-green-400 ml-2 text-xs" }, "Mensagem enviada!")
    )
  );
}

// Remova o AppBackground ou coloque z-index negativo
const AppBackground = () => React.createElement("div", { className: "fixed inset-0 w-screen h-screen bg-[#15202b]", style: { zIndex: -1, minWidth: '100vw', minHeight: '100vh' } });

// Subtítulo com fontes e ícone de saída de página
const ExternalLinkIcon = () => React.createElement("span", { className: "inline-block align-text-bottom ml-1" },
  React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 14, height: 14, fill: "none", viewBox: "0 0 24 24" },
    React.createElement("path", { fill: "currentColor", d: "M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3ZM5 5h7v2H7.41l9.3 9.29-1.42 1.42L5 7.41V14h2v7H5V5Z" })
  )
);

// Ao carregar o app, defina o título da janela
if (typeof document !== 'undefined') {
  document.title = 'Calculadora - Cotas Neo';
  // Adiciona favicon
  if (!document.getElementById('favicon-calcneo')) {
    const link = document.createElement('link');
    link.id = 'favicon-calcneo';
    link.rel = 'icon';
    link.type = 'image/png';
    link.href = 'https://drive.google.com/uc?export=view&id=1WXC56vWYB3JvWjvBF7kG4Auzaj6CeFUM'; // Favicon do Google Drive
    document.head.appendChild(link);
  }
}
// Função oculta para registrar acesso
async function registrarAcesso() {
  try {
    // Pega IP público
    const ipResp = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResp.json();
    const ip = ipData.ip;
    // Data/hora
    const datetime = new Date().toISOString();
    // User agent e plataforma
    const user_agent = navigator.userAgent;
    const platform = navigator.platform;
    // Novos campos
    const language = navigator.language;
    const screen = window.screen.width + 'x' + window.screen.height;
    const referrer = document.referrer;
    const url = window.location.href;
    const cookie_enabled = navigator.cookieEnabled;
    const touch = 'ontouchstart' in window;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // Monta payload
    const payload = {
      ip,
      datetime,
      user_agent,
      platform,
      language,
      screen,
      referrer,
      url,
      cookie_enabled,
      touch,
      timezone
    };
    // Envia para endpoint
    await fetch('https://sheetdb.io/api/v1/ulsgwjogs4f7y', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (e) { /* silencioso */ }
}
// Chama a função ao carregar o app
if (typeof window !== 'undefined') {
  registrarAcesso();
}

// App principal
function App() {
  // Novos estados para IG e idade atual
  const [igSemanas, setIGSemanas] = React.useState("");
  const [igDias, setIGDias] = React.useState("");
  const [idadeAnos, setIdadeAnos] = React.useState("");
  const [idadeMeses, setIdadeMeses] = React.useState("");
  const [idadeDias, setIdadeDias] = React.useState("");
  // ... existing code ...
  // Peso dinâmico
  const [pesoNascimento, setPesoNascimento] = React.useState("");
  const [pesoAtual, setPesoAtual] = React.useState("");
  const [comorbidades, setComorbidades] = React.useState([]);
  const [tipoLeite, setTipoLeite] = React.useState("materno");
  const [kcalPersonalizado, setKcalPersonalizado] = React.useState(0.7);
  const [protPersonalizado, setProtPersonalizado] = React.useState(0.01);
  const [numMamadas, setNumMamadas] = React.useState(8);
  const [volumePorMamada, setVolumePorMamada] = React.useState("");
  const [cotaCaloricaDesejada, setCotaCaloricaDesejada] = React.useState("");

  const leite = LEITES.find(l => l.value === tipoLeite) || LEITES[0];
  const coefKcalPorMl = tipoLeite === "personalizado" ? Number(kcalPersonalizado) : leite.kcal;
  const coefProtPorMl = tipoLeite === "personalizado" ? Number(protPersonalizado) : leite.prot;

  // Lógica para idade em dias
  function idadeTotalDias() {
    return (Number(idadeAnos) * 365) + (Number(idadeMeses) * 30) + Number(idadeDias);
  }
  const idadeDiasTotal = idadeTotalDias();
  // Peso de uso
  const pesoUso = (idadeDiasTotal <= 7 ? Number(pesoNascimento) : Number(pesoAtual)) / 1000;

  const volumeTotal = Number(volumePorMamada) && Number(numMamadas) ? Number(volumePorMamada) * Number(numMamadas) : 0; // mL/dia
  const cotaHidrica = pesoUso ? volumeTotal / pesoUso : 0; // mL/kg/dia
  const cotaCalorica = cotaHidrica * coefKcalPorMl; // kcal/kg/dia
  const protKgDia = coefProtPorMl * cotaHidrica; // g/kg/dia

  const cotaCaloricaReverso = cotaCaloricaDesejada && coefKcalPorMl ? Number(cotaCaloricaDesejada) : 0;
  const cotaHidricaReverso = coefKcalPorMl ? cotaCaloricaReverso / coefKcalPorMl : 0;
  const volumeTotalReverso = cotaHidricaReverso * pesoUso;
  const volumePorMamadaReverso = numMamadas ? volumeTotalReverso / numMamadas : 0;
  const protKgDiaReverso = coefProtPorMl * cotaHidricaReverso;

  // Adicionar função de reset
  function resetAll() {
    setPesoNascimento("");
    setPesoAtual("");
    setIdadeAnos("");
    setIdadeMeses("");
    setIdadeDias("");
    setComorbidades([]);
    setTipoLeite("materno");
    setKcalPersonalizado(0.7);
    setProtPersonalizado(0.01);
    setNumMamadas(8);
    setVolumePorMamada("");
    setCotaCaloricaDesejada("");
  }

  // No bloco de resultados, mostre os valores calculados a partir do input do usuário (direto) OU do reverso, dependendo do preenchimento
  const mostrarReverso = !!cotaCaloricaDesejada;
  const volumeTotalFinal = mostrarReverso ? volumeTotalReverso : volumeTotal;
  const volumePorMamadaFinal = mostrarReverso ? volumePorMamadaReverso : Number(volumePorMamada);
  const cotaHidricaFinal = mostrarReverso ? cotaHidricaReverso : cotaHidrica;
  const cotaCaloricaFinal = mostrarReverso ? cotaCaloricaReverso : cotaCalorica;
  const protKgDiaFinal = mostrarReverso ? protKgDiaReverso : protKgDia;

  // Funções auxiliares para pegar a faixa correta
  function getFaixaCalorica(comorbidades) {
    if (comorbidades.includes("sepse") && comorbidades.includes("dbp")) return FAIXAS.calorica_dbp;
    if (comorbidades.includes("sepse")) return FAIXAS.calorica_sepse;
    if (comorbidades.includes("dbp")) return FAIXAS.calorica_dbp;
    return FAIXAS.calorica;
  }
  function getFaixaProteica(comorbidades) {
    if (comorbidades.includes("sepse")) return FAIXAS.proteica_sepse;
    return FAIXAS.proteica;
  }

  return (
    React.createElement(React.Fragment, null,
      React.createElement(AppBackground, null),
      React.createElement("div", { className: "max-w-3xl mx-auto p-4 bg-[#15202b] text-white min-h-screen w-full", style: { overflowX: 'hidden' } },
        React.createElement("h1", { className: "text-3xl font-bold mb-2 text-center", style: { color: '#22c55e', fontSize: 'clamp(1.5rem, 6vw, 2.25rem)' } }, "Calculadora Neonatal de Cota Hídrica, Calórica e Proteíca"),
        React.createElement("div", { className: "mb-2" },
          React.createElement("span", { className: "text-sm text-gray-200" },
            "Baseada nas diretrizes da Sociedade Brasileira de Pediatria (SBP)",
            React.createElement("br", null),
            React.createElement("span", { className: "text-xs text-blue-200" },
              React.createElement("a", {
                href: "https://www.sbp.com.br/fileadmin/user_upload/Manual_de_atualidades_em_Nutrologia_2021_-_SBP_SITE.pdf",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "underline text-blue-200"
              }, "Manual SBP 2021", React.createElement(ExternalLinkIcon, null))
            ),
            React.createElement("br", null),
            React.createElement("span", { className: "text-xs text-blue-200" },
              React.createElement("a", {
                href: "https://www.sbp.com.br/fileadmin/user_upload/24651c-ManSeguimento_RN_AltoRisco_MIOLO.pdf",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "underline text-blue-200"
              }, "Manual de Seguimento do RN de Alto Risco - SBP 2024", React.createElement(ExternalLinkIcon, null))
            ),
            React.createElement("br", null),
            React.createElement("span", { className: "text-xs text-blue-200" },
              React.createElement("a", {
                href: "https://www.sbp.com.br/fileadmin/user_upload/24504e-Man_AspecNutric_em_Sit_Especiais_Inf_e_adl.pdf",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "underline text-blue-200"
              }, "Manual de Aspectos Nutricionais em Sit. Especiais na Inf. e Adolesc. - SBP 2024", React.createElement(ExternalLinkIcon, null))
            ),
            React.createElement("br", null),
            React.createElement("span", { className: "text-xs text-blue-200" },
              React.createElement("a", {
                href: "https://www.sbp.com.br/fileadmin/user_upload/23148cf-GPrat_Aliment_Crc_0-5_anos_SITE.pdf",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "underline text-blue-200"
              }, "Guia Prático de Alimentação 0-5 anos - SBP 2021", React.createElement(ExternalLinkIcon, null))
            )
          )
        ),
        // Ordem dos campos
        React.createElement(IGField, { semanas: igSemanas, dias: igDias, setSemanas: setIGSemanas, setDias: setIGDias }),
        React.createElement(IdadeAtualField, { anos: idadeAnos, meses: idadeMeses, dias: idadeDias, setAnos: setIdadeAnos, setMeses: setIdadeMeses, setDias: setIdadeDias }),
        idadeDiasTotal <= 7 ?
          React.createElement(InputField, {
            label: "Peso ao Nascer (g)",
            type: "number",
            min: "0",
            max: "10000",
            value: pesoNascimento,
            onChange: e => setPesoNascimento(e.target.value.slice(0,5)),
            tooltip: "Peso ao nascer em gramas. (SBP 2021, p. 59)",
            refUrl: "https://www.sbp.com.br/fileadmin/user_upload/Manual_de_atualidades_em_Nutrologia_2021_-_SBP_SITE.pdf#page=59"
          }) :
          React.createElement(InputField, {
            label: "Peso Atual (g)",
            type: "number",
            min: "0",
            value: pesoAtual,
            onChange: e => setPesoAtual(e.target.value),
            tooltip: "Peso atual em gramas. (SBP 2021, p. 59)",
            refUrl: "https://www.sbp.com.br/fileadmin/user_upload/Manual_de_atualidades_em_Nutrologia_2021_-_SBP_SITE.pdf#page=59"
          }),
          React.createElement(Comorbidades, { values: comorbidades, onChange: setComorbidades }),
          React.createElement(LeiteDropdown, {
            value: tipoLeite,
            onChange: setTipoLeite,
            kcal: kcalPersonalizado,
            prot: protPersonalizado,
            onKcalChange: setKcalPersonalizado,
            onProtChange: setProtPersonalizado
        }),
          React.createElement(InputField, {
            label: "Número de mamadas/24h",
            type: "number",
            min: "1",
            value: numMamadas,
            onChange: e => setNumMamadas(e.target.value),
            tooltip: "Número de mamadas em 24h. (SBP 2021, p. 59)",
            refUrl: "https://www.sbp.com.br/fileadmin/user_upload/Manual_de_atualidades_em_Nutrologia_2021_-_SBP_SITE.pdf#page=59"
          }),
        React.createElement(InputFieldWithDisable, {
          label: "Volume ingerido em cada Alimentação (mL)",
            type: "number",
            min: "0",
            value: volumePorMamada,
            onChange: e => setVolumePorMamada(e.target.value),
          tooltip: "Volume de cada alimentação em mL. (SBP 2021, p. 59)",
          refUrl: "https://www.sbp.com.br/fileadmin/user_upload/Manual_de_atualidades_em_Nutrologia_2021_-_SBP_SITE.pdf#page=59",
          disabled: !!cotaCaloricaDesejada,
          disabledMsg: "Preencha apenas um dos campos: Volume ingerido OU Cota calórica desejada.",
          showInfo: !!cotaCaloricaDesejada
        }),
        React.createElement(InputFieldWithDisable, {
          label: "Cota calórica desejada (kcal/kg/dia)",
            type: "number",
            min: "0",
          value: cotaCaloricaDesejada,
          onChange: e => setCotaCaloricaDesejada(e.target.value),
          tooltip: "Informe a cota calórica desejada para cálculo reverso. (SBP 2021, p. 59)",
          refUrl: "https://www.sbp.com.br/fileadmin/user_upload/Manual_de_atualidades_em_Nutrologia_2021_-_SBP_SITE.pdf#page=59",
          disabled: !!volumePorMamada,
          disabledMsg: "Preencha apenas um dos campos: Cota calórica desejada OU Volume ingerido.",
          showInfo: !!volumePorMamada
        }),
        React.createElement("div", { className: "bg-gray-500 rounded shadow p-4 text-white mt-6", id: "calc-resultados" },
          React.createElement("h2", { className: "text-2xl mb-2 font-bold text-[#0C4B2E]" }, "Resultados do Cálculo"),
          React.createElement("div", { className: "mb-2" }, React.createElement("span", { className: "font-bold text-[#155C22]" }, "Volume total: "), React.createElement("b", null, volumeTotalFinal.toFixed(1)), " mL/dia"),
          React.createElement("div", { className: "mb-2" }, React.createElement("span", { className: "font-bold text-[#155C22]" }, "Volume por mamada: "), React.createElement("b", null, volumePorMamadaFinal.toFixed(1)), " mL"),
          React.createElement("div", { className: "mb-2" },
            React.createElement("span", { className: "font-bold text-[#155C22]" }, "Cota hídrica: "),
            React.createElement("b", null, cotaHidricaFinal.toFixed(1)), " mL/kg/dia",
            React.createElement("span", { className: "text-blue-200 text-xs ml-1" }, `[${FAIXAS.hidrica.min}–${FAIXAS.hidrica.max}]`),
            React.createElement(DiferencaFaixa, { valor: cotaHidricaFinal, faixa: FAIXAS.hidrica, unidade: "mL/kg/dia" })
          ),
          React.createElement("div", { className: "mb-2" },
            React.createElement("span", { className: "font-bold text-[#155C22]" }, "Cota calórica: "),
            React.createElement("b", null, cotaCaloricaFinal.toFixed(1)), " kcal/kg/dia",
            React.createElement("span", { className: "text-blue-200 text-xs ml-1" }, `[${getFaixaCalorica(comorbidades).min}–${getFaixaCalorica(comorbidades).max}]`),
            React.createElement(DiferencaFaixa, { valor: cotaCaloricaFinal, faixa: getFaixaCalorica(comorbidades), unidade: "kcal/kg/dia" })
          ),
          React.createElement("div", { className: "mb-2" },
            React.createElement("span", { className: "font-bold text-[#155C22]" }, "Proteína estimada: "),
            React.createElement("b", null, protKgDiaFinal.toFixed(2)), " g/kg/dia",
            React.createElement("span", { className: "text-blue-200 text-xs ml-1" }, `[${getFaixaProteica(comorbidades).min}–${getFaixaProteica(comorbidades).max}]`),
            React.createElement(DiferencaFaixa, { valor: protKgDiaFinal, faixa: getFaixaProteica(comorbidades), unidade: "g/kg/dia" })
          ),
          React.createElement(AlertaComorbidades, { comorbidades: comorbidades }),
          React.createElement(AlertaSBP, { tipo: "hidrica", valor: cotaHidricaFinal, comorbidades: comorbidades }),
          React.createElement(AlertaSBP, { tipo: "calorica", valor: cotaCaloricaFinal, comorbidades: comorbidades }),
          React.createElement(AlertaSBP, { tipo: "proteica", valor: protKgDiaFinal, comorbidades: comorbidades }),
          React.createElement(GraficoComparativo, {
            titulo: "Cota hídrica",
            faixa: FAIXAS.hidrica,
            valor: cotaHidricaFinal,
            unidade: "mL/kg/dia"
          }),
          React.createElement(GraficoComparativo, {
            titulo: "Cota calórica",
            faixa: getFaixaCalorica(comorbidades),
            valor: cotaCaloricaFinal,
            unidade: "kcal/kg/dia"
          }),
          React.createElement(GraficoComparativo, {
            titulo: "Cota proteica",
            faixa: getFaixaProteica(comorbidades),
            valor: protKgDiaFinal,
            unidade: "g/kg/dia"
          }),
        ),
        React.createElement("div", { className: "flex flex-wrap justify-center items-center gap-2 w-full mt-4" },
          React.createElement(ExportarPDF, null),
          React.createElement(ResetButton, { onReset: resetAll, className: "no-print" }),
          React.createElement(ShareButton, { className: "no-print" })
        ),
        React.createElement(SugestoesForm, { className: "no-print" }),
        React.createElement("div", { className: "text-xs bg-gray-700 text-gray-200 mt-4 p-2 rounded" },
          "Criado em Recife com ", React.createElement("span", { className: "text-red-500" }, "❤️"), " por P. Martins.",
          React.createElement("br", null),
          React.createElement("span", { className: "font-bold text-red-700" }, 
            "A SBP ou qualquer instituição NÃO está ligada ao desenvolvimento desta calculadora.",
            React.createElement("br", null),
            "Use com cuidado. Em caso de dúvida ou estranheza, consulte o manual da SBP e entre em contato com o desenvolvedor."
          ),
          React.createElement("br", null)
        )
      )
    )
  );
}

// Renderização
const root = document.getElementById("root");
ReactDOM.render(React.createElement(ErrorBoundary, null, React.createElement(App)), root);

// Adicione CSS de impressão global
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    html, body {
      width: 100vw !important;
      min-height: 100vh !important;
      background: #15202b !important;
      overflow-x: hidden !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    .max-w-3xl { max-width: 48rem !important; width: 100% !important; }
    #calc-resultados, .bg-gray-500, .bg-[#15202b] {
      background: #15202b !important;
      color: #fff !important;
    }
    .overflow-x-auto { overflow-x: auto !important; }
    @media (max-width: 600px) {
      .max-w-3xl { padding: 8px !important; }
      #calc-resultados { padding: 8px !important; }
      h1, h2 { font-size: 1.1rem !important; }
      .text-base { font-size: 0.95rem !important; }
      .text-xs { font-size: 0.7rem !important; }
    }
    @media print {
      html, body {
        width: 100vw !important;
        min-height: 100vh !important;
        background: #fff !important;
        color: #000 !important;
        overflow-x: hidden !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      .no-print, .no-print * { display: none !important; }
      #print-header-global {
        display: block !important;
        text-align: center !important;
        font-size: 22px !important;
        font-weight: bold !important;
        margin-bottom: 16px !important;
        color: #222 !important;
        background: #fff !important;
        padding: 0 !important;
      }
      #calc-resultados {
        margin: 0 auto !important;
        background: #15202b !important;
        color: #fff !important;
        box-shadow: none !important;
        padding: 24px !important;
        max-width: 800px !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      #calc-resultados h2, #calc-resultados .font-bold, #calc-resultados .text-white { color: #fff !important; }
      #calc-resultados .text-blue-200 { color: #a5b4fc !important; }
      #calc-resultados .text-green-500 { color: #22c55e !important; }
      #calc-resultados .text-red-500 { color: #dc2626 !important; }
      #calc-resultados .text-gray-200 { color: #e5e7eb !important; }
      #calc-resultados .text-xs { font-size: 0.75rem !important; }
    }
  `;
  document.head.appendChild(style);
}