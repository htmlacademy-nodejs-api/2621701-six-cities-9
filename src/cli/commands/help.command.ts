import { Command } from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements Command {
  public readonly name: string = '--help';

  public execute(..._parameters: string[]): void {
    console.info(`
        ${chalk.bold.blue('Программа для подготовки данных для REST API сервера.')}
        ${chalk.underline.red('Пример:')}
            ${chalk.italic.yellow('cli.js --<command> [--arguments]')}
        ${chalk.underline.red('Команды:')}
            ${chalk.yellow('--version:')}                     ${chalk.green('# выводит номер версии')}
            ${chalk.yellow('--help:')}                        ${chalk.green('# печатает этот текст')}
            ${chalk.yellow('--import <path>:')}               ${chalk.green('# импортирует данные из TSV')}
            ${chalk.yellow('--generate <n> <path> <url>')}    ${chalk.green('# генерирует произвольное количество тестовых данных')}
    `);
  }
}
