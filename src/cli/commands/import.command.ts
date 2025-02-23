import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/file-reader/index.js';
import { getErrorMessage } from '../../shared/helpers/index.js';
import { Offer } from '../../shared/types/index.js';

export class ImportCommand implements Command {
  public readonly name: string = '--import';

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedOffer);
    fileReader.on('end', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (err) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(err));
    }
  }

  private onImportedOffer(offer: Offer): void {
    console.info(offer);
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
  }
}
