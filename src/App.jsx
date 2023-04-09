// Components
import { GrFormNext, GrFormPrevious } from "react-icons/gr"
import { FiSend } from "react-icons/fi"
import UserForm from "./components/UserForm"
import ReviewForm from "./components/ReviewForm"
import Thanks from "./components/Thanks"
import Steps from "./components/Steps"

//hooks
import { useForm } from "./hooks/UseForm"
import { useState } from "react"

// CSS
import "./App.css"

const formTemplate = {
  name: "",
  email: "",
  review: "",
  comment: "",
}

function App() {
  const [data, setData] = useState(formTemplate)

  const updateFieldHandler = (key, value) => {
    setData((prev) => {
      return { ...prev, [key]: value }
    })
  }

  const formComponents = [
    <UserForm data={data} updateFieldHandler={updateFieldHandler} />,
    <ReviewForm data={data} updateFieldHandler={updateFieldHandler} />,
    <Thanks data={data} />,
  ]

  const { currentStep, currentComponent, changeStep, isLastStep } =
    useForm(formComponents)

  return (
    <div className="app">
      <header className="header">
        <h2>Deixe sua avaliação</h2>
        <p>
          Ficamos felizes com sua compra, utilize o formulario abaixo para
          avaliar o produto
        </p>
      </header>

      <div className="form-container">
        <Steps currentStep={currentStep} />
        <form onSubmit={(e) => changeStep(currentStep + 1, e)}>
          <div className="inputs-container">{currentComponent}</div>
          <div className="actions">
            <button type="button" onClick={() => changeStep(currentStep - 1)}>
              <GrFormPrevious />
              <span>Voltar</span>
            </button>

            {!isLastStep ? (
              <button type="submit">
                <GrFormNext />
                <span>Avançar</span>
              </button>
            ) : (
              <button type="button">
                <FiSend />
                <span>Enviar</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
