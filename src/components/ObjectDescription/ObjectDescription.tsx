import * as React from 'react';
import { Schema } from '../Schema';

import { MiddlePanel, Row, Section, DarkRightPanel } from '../../common-elements';
import { OpenAPIParser, RedocNormalizedOptions, MediaTypeModel } from '../../services';
import { MediaTypeSamples } from '../PayloadSamples/MediaTypeSamples';
import { OpenAPIMediaType } from '../../types';

export interface ObjectDescriptionProps {
  schemaRef: string;
  examplesRef?: string;
  parser: OpenAPIParser;
  options: RedocNormalizedOptions;
}

export class ObjectDescription extends React.PureComponent<ObjectDescriptionProps> {
  private mediaModel: MediaTypeModel;

  constructor(props: ObjectDescriptionProps) {
    super(props);
    this.mediaModel = ObjectDescription.getMediaModel(this.props);
  }

  render() {
    return (
      <Section>
        <Row>
          <MiddlePanel>
            <Schema skipWriteOnly={true} key="schema" schema={this.mediaModel.schema} />
          </MiddlePanel>
          <DarkRightPanel>
            <MediaTypeSamples mediaType={this.mediaModel} />
          </DarkRightPanel>
        </Row>
      </Section>
    );
  }

  private static getMediaType(schemaRef, examplesRef): OpenAPIMediaType {
    if (!schemaRef) return {};

    const info: OpenAPIMediaType = {
      schema: { $ref: schemaRef },
    };

    if (examplesRef) info.examples = { object: { $ref: examplesRef } };
    return info;
  }

  private static getMediaModel({
    schemaRef,
    examplesRef,
    parser,
    options,
  }: ObjectDescriptionProps) {
    return new MediaTypeModel(
      parser,
      'json',
      false,
      ObjectDescription.getMediaType(schemaRef, examplesRef),
      options,
    );
  }
}
