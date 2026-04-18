import { FileDrop } from "../components/FileDrop/FileDrop";

export default function App() {
    function handleFiles(files: File[]) {
        console.log("Arquivos recebidos:", files);
    }

    return (
        <>
            <section className="upload">
                <div>
                    <h1>Seja bem-vindo(a)!</h1>
                    <p>Para começar, por favor, carregue o formulário Excel desta semana no campo abaixo. Os itens serão mostrados logo após o upload.</p>
                </div>
                
                <FileDrop
                    accept=".pdf,.xlsx,.xls,.csv,image/*"
                    multiple
                    onFilesSelect={handleFiles}
                    title="Clique aqui para selecionar"
                    subtitle="Lembre-se de selecionar o desta semana"
                />

                <p><strong>Importante: </strong>o site ainda está em desenvolvimento e erros podem acontecer. Por isso, verifique o formulário.</p>
            </section>

            <section className="suggestions">
                <div>
                    <h1>Sugestões</h1>
                    <p>Confira algumas sugestões versáteis!</p>
                </div>

                <div>
                    
                </div>

                <p><strong>Importante: </strong>como o arquivo ainda não foi carregado, alguns produtos podem estar indisponíveis.</p>
            </section>
        </>
    );
}