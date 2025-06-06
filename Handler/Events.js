import fs from "fs";
import path from "path";

export default {
    async run(client) {
        const Path = "./Events";
        const Pastas = fs.readdirSync(Path).filter((pasta) => fs.statSync(path.join(Path, pasta)).isDirectory());

        for (const Pasta of Pastas) {
            const Arquivos = fs.readdirSync(path.join(Path, Pasta));

            for (const Arquivo of Arquivos) {
                if (Arquivo.endsWith('.js')) {
                    const CaminhoArquivo = path.join(process.cwd(), Path, Pasta, Arquivo);
                    const caminho = await import(`file://${CaminhoArquivo}`);
                    const evt = caminho.default || caminho;

                    if (evt.once) {
                        client.once(evt.name, (...args) => evt.run(...args, client));
                    } else {
                        client.on(evt.name, (...args) => evt.run(...args, client));
                    }
                }
            }
        }
    }
}