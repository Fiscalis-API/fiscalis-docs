import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Fiscalis a été conçue dès le départ pour être facilement intégrée et utilisée dans votre système de facturation. 
        Il reprends les spécification de base de l'API Web de la DGI.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
      Laissez-vous guider par les spécifications de l'API Web de la DGI, et nous nous occupons du reste. 
      De l'utilisation de l'API Web de la DGI ou du dispositif physique MCF, Fiscalis vous donne la solution idéale. 
      </>
    ),
  },
  {
    title: 'Demander l\' homologation complète',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Grâce à Fiscalis , vous pouvez demander l'homologation complète de votre solution de facturation.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
