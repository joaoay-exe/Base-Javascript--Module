import fs from "fs";
import path from "path";

export default {
    async run(client) {
        const Path = "./Commands";
        const Pastas = fs.readdirSync(Path);
        const commands = [];

        for (const Pasta of Pastas) {
            const Arquivos = fs.readdirSync(`${Path}/${Pasta}`).filter(file => file.endsWith(".js"));

            for (const Arquivo of Arquivos) {
                if (Arquivo.endsWith('.js')) {
                    const CaminhoArquivo = path.join(process.cwd(), Path, Pasta, Arquivo);
                    const URL = `file://${CaminhoArquivo}`;
                    const Module = await import(URL);
                    const cmd = Module.default || Module;

                    client.SlashCommands.set(cmd.name, cmd);
                    commands.push(cmd);
                }
            }
        }

        client.on("ready", async () => {
            await client.application.commands.set(commands);
        })
    }
}