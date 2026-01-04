import { Card } from '@/components/ui/Card';
import { Icon, IconName } from '@/components/ui/Icon';
import { getFeatures } from '@/lib/data';

export const FeaturesSection = async () => {
  const features = await getFeatures();

  return (
    <section className="py-24 bg-surface dark:bg-black">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-text-main dark:text-white mb-4">
            Why Shivanksha Travels?
          </h2>
          <p className="text-text-sub text-lg md:text-xl max-w-2xl mx-auto">
            We don't just take you there. We ensure you feel the spirit of the
            <span className="font-bold"> Dev Bhoomi.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.id}
              variant="white"
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-surface dark:bg-black flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Icon
                  name={feature.icon as IconName}
                  size={32}
                  className="text-text-main dark:text-white"
                />
              </div>
              <h3 className="text-xl font-bold mb-2 text-text-main dark:text-white">
                {feature.title}
              </h3>
              <p className="text-text-sub leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
