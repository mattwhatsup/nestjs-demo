import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDto } from './dto';
import { EditBookmarkDto } from './dto/edit-bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(private prismaService: PrismaService) {}
  getBookmarks(userId: number) {
    return this.prismaService.bookmark.findMany({
      where: {
        userId,
      },
    });
  }

  getBookmarkById(userId: number, bookmarkId: number) {
    return this.prismaService.bookmark.findFirst({
      where: {
        id: bookmarkId,
        userId,
      },
    });
  }

  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    const bookmark = await this.prismaService.bookmark.create({
      data: {
        userId,
        ...dto,
      },
    });
    return bookmark;
  }

  editBookmarkById(userId: number, bookmarkId: number, dto: EditBookmarkDto) {
    const bookmark = this.getBookmarkById(userId, bookmarkId);
    if (!bookmark) {
      throw new ForbiddenException('Access resource denied');
    }

    return this.prismaService.bookmark.update({
      where: { id: bookmarkId },
      data: { ...dto },
    });
  }

  deleteBookmarkById(userId: number, bookmarkId: number) {
    const bookmark = this.getBookmarkById(userId, bookmarkId);
    if (!bookmark) {
      throw new ForbiddenException('Access resource denied');
    }

    return this.prismaService.bookmark.delete({
      where: { id: bookmarkId },
    });
  }
}
