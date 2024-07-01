import React from 'react';
import JokesQueries from '~/queries/jokes.queries';
import { useQuery } from '@tanstack/react-query';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';

function App() {
  const jokesQuery = useQuery(JokesQueries.list());

  const reload = () => {
    jokesQuery.refetch();
  };

  return (
    <div className="space-y-10 mx-8 my-6">
      <div className="flex justify-center">
        <h1>Welcome in S-Project</h1>
      </div>

      {jokesQuery.isSuccess && (
        <div className="flex justify-center">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Chuck Norris</CardTitle>
              <CardDescription>{jokesQuery.data.value}</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={jokesQuery.data.icon_url}
                alt="icon_jokes"
                className="mx-auto"
              />
            </CardContent>
            <CardFooter>
              <div className="flex items-center justify-between w-full">
                <Button onClick={reload} variant="outline">
                  <FontAwesomeIcon icon={faRepeat} className="mr-2" />
                  Reload
                </Button>
                <Button asChild>
                  <a
                    href={jokesQuery.data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    See more
                  </a>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}

export default App;
