-- CreateTable
CREATE TABLE "advertiser_votes" (
    "id" SERIAL NOT NULL,
    "advertiser_name" VARCHAR(255) NOT NULL,
    "fingerprint" VARCHAR(255) NOT NULL,
    "vote" VARCHAR(10) NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "advertiser_votes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "advertisers" (
    "advertiser_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255),
    "logo_url" TEXT,
    "url" TEXT,
    "description" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "health_score" INTEGER DEFAULT 50,

    CONSTRAINT "advertisers_pkey" PRIMARY KEY ("advertiser_id")
);

-- CreateTable
CREATE TABLE "deal_health_votes" (
    "id" SERIAL NOT NULL,
    "product_slug" VARCHAR(255) NOT NULL,
    "vote" VARCHAR(20) NOT NULL,
    "fingerprint" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "deal_health_votes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feeds" (
    "id" SERIAL NOT NULL,
    "program_id" INTEGER NOT NULL,
    "program_name" VARCHAR(255) NOT NULL,
    "catalog_id" VARCHAR(255),
    "catalog_name" VARCHAR(255),
    "https_link" TEXT,
    "country" VARCHAR(10) DEFAULT 'US',
    "total_products" INTEGER DEFAULT 0,
    "status" VARCHAR(50) DEFAULT 'pending',
    "source_updated_at" TIMESTAMP(3),
    "last_imported_at" TIMESTAMP(3),
    "products_imported" INTEGER DEFAULT 0,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feeds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "variants" (
    "id" SERIAL NOT NULL,
    "program_id" INTEGER,
    "product_id" TEXT NOT NULL,
    "group_id" INTEGER,
    "country" VARCHAR(2) DEFAULT 'US',
    "currency" VARCHAR(3) DEFAULT 'USD',
    "name" TEXT NOT NULL,
    "brand" TEXT,
    "description" TEXT,
    "price" DECIMAL,
    "final_price" DECIMAL,
    "discount_pct" INTEGER DEFAULT 0,
    "is_on_sale" BOOLEAN DEFAULT false,
    "gender" VARCHAR(20),
    "category" VARCHAR(100),
    "sub_category" VARCHAR(100),
    "color" TEXT,
    "size" TEXT,
    "sku" TEXT,
    "url" TEXT,
    "image_url" TEXT,
    "in_stock" BOOLEAN DEFAULT true,
    "visibility" VARCHAR(20) DEFAULT 'live',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "parent_slug" TEXT,
    "variant_slug" TEXT,
    "normalized_name" TEXT,
    "advertiser_name" VARCHAR(255),
    "region" VARCHAR(10) DEFAULT 'na',

    CONSTRAINT "variants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "normalized_name" TEXT,
    "brand" TEXT,
    "gender" VARCHAR(20),
    "category" VARCHAR(100),
    "sub_category" VARCHAR(100),
    "country" VARCHAR(2) DEFAULT 'US',
    "region" VARCHAR(10) DEFAULT 'na',
    "best_variant_id" INTEGER,
    "best_price" DECIMAL,
    "image_url" TEXT,
    "url" TEXT,
    "in_stock" BOOLEAN DEFAULT false,
    "is_on_sale" BOOLEAN DEFAULT false,
    "discount_pct" INTEGER DEFAULT 0,
    "visibility" VARCHAR(20) DEFAULT 'pending',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promotions" (
    "id" SERIAL NOT NULL,
    "advertiser_id" INTEGER,
    "title" VARCHAR(500) NOT NULL,
    "description" TEXT,
    "coupon_code" VARCHAR(100),
    "discount_percent" DECIMAL(5,2),
    "discount_amount" DECIMAL(10,2),
    "minimum_purchase" DECIMAL(10,2),
    "terms" TEXT,
    "url" TEXT,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "is_active" BOOLEAN DEFAULT true,
    "is_verified" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "promotions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sync_log" (
    "id" SERIAL NOT NULL,
    "run_id" TEXT NOT NULL,
    "started_at" TIMESTAMPTZ(6) NOT NULL,
    "completed_at" TIMESTAMPTZ(6) NOT NULL,
    "duration_ms" INTEGER NOT NULL,
    "feeds_synced" INTEGER NOT NULL,
    "total_imported" INTEGER NOT NULL,
    "stale_hidden" INTEGER NOT NULL,
    "errors" JSONB DEFAULT '[]',
    "results" JSONB DEFAULT '{}',

    CONSTRAINT "sync_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_advertiser_votes_name" ON "advertiser_votes"("advertiser_name");

-- CreateIndex
CREATE UNIQUE INDEX "advertiser_votes_advertiser_name_fingerprint_key" ON "advertiser_votes"("advertiser_name", "fingerprint");

-- CreateIndex
CREATE UNIQUE INDEX "advertisers_slug_key" ON "advertisers"("slug");

-- CreateIndex
CREATE INDEX "idx_advertisers_active" ON "advertisers"("is_active");

-- CreateIndex
CREATE INDEX "idx_deal_health_created_at" ON "deal_health_votes"("created_at");

-- CreateIndex
CREATE INDEX "idx_deal_health_product_slug" ON "deal_health_votes"("product_slug");

-- CreateIndex
CREATE UNIQUE INDEX "feeds_program_id_key" ON "feeds"("program_id");

-- CreateIndex
CREATE INDEX "idx_feeds_country" ON "feeds"("country");

-- CreateIndex
CREATE INDEX "idx_feeds_program_id" ON "feeds"("program_id");

-- CreateIndex
CREATE INDEX "idx_feeds_status" ON "feeds"("status");

-- CreateIndex
CREATE INDEX "idx_variants_group_id" ON "variants"("group_id");

-- CreateIndex
CREATE UNIQUE INDEX "variants_program_id_product_id_key" ON "variants"("program_id", "product_id");

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "products_best_variant_id_key" ON "products"("best_variant_id");

-- CreateIndex
CREATE INDEX "idx_products_visibility_country_gender" ON "products"("visibility", "country", "gender");

-- CreateIndex
CREATE INDEX "idx_promotions_active" ON "promotions"("is_active", "end_date");

-- CreateIndex
CREATE INDEX "idx_promotions_advertiser" ON "promotions"("advertiser_id");

-- AddForeignKey
ALTER TABLE "variants" ADD CONSTRAINT "variants_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_best_variant_id_fkey" FOREIGN KEY ("best_variant_id") REFERENCES "variants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotions" ADD CONSTRAINT "promotions_advertiser_id_fkey" FOREIGN KEY ("advertiser_id") REFERENCES "advertisers"("advertiser_id") ON DELETE CASCADE ON UPDATE CASCADE;
