import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from '../entities/restaurant.entity';
import { Offer, Dish, Category } from '../entities/menu.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    @InjectRepository(Dish)
    private dishRepository: Repository<Dish>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getRestaurants(): Promise<Restaurant[]> {
    return this.restaurantRepository.find();
  }

  // #Ошибка 14
  async getFullMenu(): Promise<{ categories: Category[]; dishes: Dish[]; offers: Offer[] }> {
    const categories = await this.categoryRepository.find();
    const dishes = await this.dishRepository.find();
    const offers = await this.offerRepository.find();
    return { categories, dishes, offers };
  }

  async getOffersForDish(dishId: string): Promise<Offer[]> {
    return this.offerRepository.find({
      where: { dishId, available: true },
    });
  }

  async getOfferById(offerId: string): Promise<Offer> {
    const offer = await this.offerRepository.findOne({ where: { id: offerId } });
    if (!offer) {
      throw new NotFoundException(`Offer ${offerId} not found`);
    }
    return offer;
  }

  async findBestOffer(dishId: string): Promise<Offer> {
    const offers = await this.getOffersForDish(dishId);
    if (offers.length === 0) {
      throw new NotFoundException(`No offers for dish ${dishId}`);
    }
    return offers.reduce((best, current) => (current.price < best.price ? current : best));
  }

  async syncOffers(newOffers: Offer[]): Promise<void> {
    await this.offerRepository.save(newOffers);
  }
}
