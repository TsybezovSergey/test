import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Restaurant } from '../entities/restaurant.entity';
import { Offer, Dish, Category } from '../entities/menu.entity';
import { Cacheable } from '../common/cacheable.decorator';

@Injectable()
export class InventoryService {
  private static readonly CACHE_KEY_RESTAURANTS = 'restaurants';
  private static readonly CACHE_KEY_FULL_MENU = 'full_menu';
  private static readonly CACHE_KEY_OFFERS_DISH = (dishId: string) => `offers_dish_${dishId}`;

  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    @InjectRepository(Dish)
    private dishRepository: Repository<Dish>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  @Cacheable(InventoryService.CACHE_KEY_RESTAURANTS)
  async getRestaurants(): Promise<Restaurant[]> {
    return this.restaurantRepository.find();
  }

  // #Ошибка 14
  @Cacheable(InventoryService.CACHE_KEY_FULL_MENU)
  async getFullMenu(): Promise<{ categories: Category[]; dishes: Dish[]; offers: Offer[] }> {
    const categories = await this.categoryRepository.find();
    const dishes = await this.dishRepository.find();
    const offers = await this.offerRepository.find();
    return { categories, dishes, offers };
  }

  @Cacheable(InventoryService.CACHE_KEY_OFFERS_DISH)
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

  // #Ошибка 7
  async syncOffers(newOffers: Offer[]): Promise<void> {
    await this.offerRepository.save(newOffers);
  }
}
