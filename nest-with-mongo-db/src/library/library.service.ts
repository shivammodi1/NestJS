import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Library, LibraryDocument } from './schema/library.schema';
import { Model } from 'mongoose';
import { Book, BookDocument } from './schema/book.schema';

@Injectable()
export class LibraryService {
        
    constructor( @InjectModel(Library.name) private libraryModel: Model<LibraryDocument>, @InjectModel(Book.name) private bookModel: Model<BookDocument>) {};

    async createLibrary(): Promise<Library> {
        const book1 = new this.bookModel({ title: 'Book 1', author: 'Author 1' });
        const book2 = new this.bookModel({ title: 'Book 2', author: 'Author 2' });
        await book1.save();
        await book2.save();

        const library = new this.libraryModel({ name: 'My Library', books: [book1._id, book2._id] });
        return library.save();
    }

    async getAllLibraries(): Promise<Library[]> {
        return this.libraryModel.find().populate('books').exec();
    }
}
